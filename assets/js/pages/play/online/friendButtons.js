import enterInviteCodeModal from './enterInviteCodeModal.js';
import playFriendModal from './playFriendModal.js';

const friendButtons = document.getElementById('friendButtons');

friendButtons.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  playFriendModal.modal.show();
});

friendButtons.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  enterInviteCodeModal.modal.show();
});

export default friendButtons;
