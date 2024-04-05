import FriendButtons from '../components/FriendButtons.js';
import enterInviteCodeModal from './enterInviteCodeModal.js';
import playFriendModal from './playFriendModal.js';

const friendButtons = new FriendButtons(
  document.getElementById('friendButtons'),
  {
    enterInviteCodeModal: enterInviteCodeModal,
    playFriendModal: playFriendModal
  }
);

export default friendButtons;
