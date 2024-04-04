import GameActionsDropdown from '../components/GameActionsDropdown.js';

const gameActionsDropdown = new GameActionsDropdown(
  document.getElementById('gameActionsDropdown'),
  {
    ul: document.querySelector('#gameActionsDropdown ul')
  }
);

export default gameActionsDropdown;
