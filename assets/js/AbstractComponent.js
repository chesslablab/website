export default class AbstractComponent {
  el;
  
  props;

  constructor(el, props) {
    this.el = el;
    this.props = props;

    this.mount();
  }

  mount() {
    throw new Error("The mount() method is an abstract method.");
  }
}
