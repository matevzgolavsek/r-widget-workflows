# On Page Widget

On page widget is a frontend part that customers append to their website. It is responsible to display Notifications, Popups and Static/Dynamic Blocks on website.

## Getting Started

These instructions will help you set up the project on you local machine for development. It is simplified to manage NPM packages.

### Prerequisites

Ensure you have installed pnpm package on your local machine, it is part of npm packages.

1. Part of NPM

```
npm install -g pnpm
```

2. Part of Docker

```
# bash
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
# sh
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
# dash
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.dashrc" SHELL="$(which dash)" dash -
```

3. Other package managers - See [installation guide](https://pnpm.io/installation)

### Development

1. Start by installing dependencies

```
pnpm install
```

2. Start the development build
   It will watch styles and javascript files and compile them

```
pnpm start
```

3. Update test file
   Update `test-suite/index.html` html file. Replace the existing script tag with the following:

```html
<script src="index.js"></script>
<script>
  var WIDGET_PUBLIC_ID = 'XXX-Y-ZZZ';
  var BACKEND_ENDPOINT = 'http://0.0.0.0:9292';
  (function (pub_id, endpoint) {
    window.RelayWidget
      ? window.RelayWidget.init(pub_id, endpoint)
      : console.error(
          'Relay Widget initialization failed:\nRequired script not loaded. Ensure the Relay Widget script is included before initializing the widget.'
        );
  })(WIDGET_PUBLIC_ID, BACKEND_ENDPOINT);
</script>
```

Make sure to replace `XXX-Y-ZZZ` with your actual public ID (it should look similar to `sYBauNncJgXCMru5-19-aefc983`). Also change `BACKEND_ENDPOINT` if needed otherwise it will fail to get content.

This script tag will load widget.js and initialize Relay Widget.

4. Preview

Server will start with `pnpm start` and then visit `http://127.0.0.1:8000`.

### Build

Just simply run

```
pnpm build
```

### Lint fix

To automatically fix linting run

```
pnpm lint:fix
```

### Deploy (in progress)

Deploy will be handled by Git Release. Need to push tag version in semantic versioning. With new `tag` push the new release will be triggered.

Merge PRs or push commits to `main` branch and after create a tag release.

```
git checkout main

git pull origin main

git tag -a v1.X.X -m 'Version 1.X.X'

git push origin v1.X.X
```
