export default class PubSub {
  subscriptions = {};

  constructor() {
    this.subscriptions = {};
  }
  __subs(event) {
    return this.subscriptions[event] ?? [];
  }
  addEventListener(event, callback) {
    const updated = [...this.__subs(event), callback];
    this.subscriptions[event] = updated;
  }
  removeEventListener(event, callback) {
    const updated = [...this.__subs(event)].filter((e) => e !== callback);
    this.subscriptions[event] = updated;
  }
  emit(event, payload = undefined) {
    const stack = this.__subs(event);
    stack.forEach((callback) => callback(payload));
  }
}
