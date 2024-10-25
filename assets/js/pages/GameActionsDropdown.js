import AbstractComponent from '../AbstractComponent.js';

export class GameActionsDropdown extends AbstractComponent {
}

export const gameActionsDropdown = new GameActionsDropdown(
  document.getElementById('gameActionsDropdown'),
  {
    ul: document.querySelector('#gameActionsDropdown ul')
  }
);
