import AbstractComponent from '../AbstractComponent.js';

export class GameActionsDropdown extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const gameActionsDropdown = new GameActionsDropdown(
  document.getElementById('gameActionsDropdown'),
  {
    ul: document.querySelector('#gameActionsDropdown ul')
  }
);
