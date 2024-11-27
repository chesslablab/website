import RootComponent from '../RootComponent.js';

export const gameActionsDropdown = new RootComponent({
  el: document.querySelector('#gameActionsDropdown'),
  props() {
    return({
      ul: this.el.querySelector('ul')
    });
  }
});
