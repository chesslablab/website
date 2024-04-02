import onlinePlayersModal from './onlinePlayersModal.js';
import createGameModal from './createGameModal.js';

const playerButtons = document.getElementById('playerButtons');

playerButtons.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  onlinePlayersModal.modal.show();
});

playerButtons.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  createGameModal.modal.show();
});

export default playerButtons;
