import BaseComponent from '../BaseComponent.js';

export class GameActionsDropdown extends BaseComponent {
}

export const gameActionsDropdown = new GameActionsDropdown(
  document.getElementById('gameActionsDropdown'),
  {
    ul: document.querySelector('#gameActionsDropdown ul')
  }
);
