import onlinePlayersModal from './onlinePlayersModal.js';
import createGameModal from './createGameModal.js';
import infoModal from '../../infoModal.js';

const playerButtons = document.getElementById('playerButtons');

playerButtons.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  if (onlinePlayersModal.props.games.length > 0) {
    onlinePlayersModal.props.modal.show();
  } else {
    infoModal.msg('There are no players connected at the moment, be the first one to create a game!');
    infoModal.modal.show();
  }
});

playerButtons.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  createGameModal.modal.show();
});

export default playerButtons;
