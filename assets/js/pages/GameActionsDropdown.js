import BaseComponent from '../BaseComponent.js';

export const gameActionsDropdown = new BaseComponent({
  el: document.querySelector('#gameActionsDropdown'),
  props() {
    return({
      ul: this.el.querySelector('ul')
    });
  }
});
