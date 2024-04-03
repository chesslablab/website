export default class AbstractComponent {
  _el;
  _props;

  constructor(el, props) {
    this._el = el;
    this._props = props;

    this.mount();
  }

  get el() {
    return this._el;
  }

  set el(el) {
    this._el = el;
  }

  get props() {
    return this._props;
  }

  set props(props) {
    this._props = props;
  }

  mount() {
    throw new Error("The mount() method is an abstract method.");
  }
}
