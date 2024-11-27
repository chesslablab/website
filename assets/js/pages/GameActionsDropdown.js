import BaseComponent from '../BaseComponent.js';

export const gameActionsDropdown = new BaseComponent(
  document.querySelector('#gameActionsDropdown'),
  {
    ul: document.querySelector('#gameActionsDropdown ul')
  }
);
