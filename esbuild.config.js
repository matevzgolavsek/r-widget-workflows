import { argv } from 'node:process';
import * as esbuild from 'esbuild';
import eslint from 'esbuild-plugin-eslint';
import babel from 'esbuild-plugin-babel';

const productionMode = 'development' !== (argv[2] || process.env.NODE_ENV);
const target = 'chrome100,firefox100,safari15'.split(',');

// bundle CSS
const buildCSS = await esbuild.context({
  entryPoints: ['./src/css/styles.css'],
  bundle: true,
  target: target,
  logLevel: productionMode ? 'error' : 'info',
  minify: productionMode,
  sourcemap: !productionMode && 'linked',
  outdir: productionMode ? './dist/' : './test-suite/'
});

// bundle JS
const buildJS = await esbuild.context({
  entryPoints: ['./src/index.js'],
  bundle: true,
  format: 'iife',
  drop: productionMode ? ['debugger', 'console'] : [], // remove console.log() and debugger; statements on build
  logLevel: productionMode ? 'error' : 'info',
  minify: productionMode,
  sourcemap: !productionMode && 'linked',
  outdir: productionMode ? './dist/' : './test-suite/',
  plugins: [eslint(), babel()],
  define: {
    ENV: productionMode
      ? JSON.stringify('production')
      : JSON.stringify('development')
  }
});

if (productionMode) {
  // single production build
  await buildCSS.rebuild();
  buildCSS.dispose();

  await buildJS.rebuild();
  buildJS.dispose();
} else {
  // watch for file changes
  await buildCSS.watch();
  await buildJS.watch();

  // development server
  await buildCSS.serve({
    servedir: './test-suite/'
  });
}
