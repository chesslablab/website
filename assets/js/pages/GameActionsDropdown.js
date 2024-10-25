import BaseComponent from '../BaseComponent.js';

export const gameActionsDropdown = new BaseComponent(
  document.getElementById('gameActionsDropdown'),
  {
    ul: document.querySelector('#gameActionsDropdown ul')
  }
);
