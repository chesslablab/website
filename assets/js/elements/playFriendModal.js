import Modal from 'bootstrap/js/dist/modal.js';
import PlayFriendModal from '../components/PlayFriendModal.js';
import copyInviteCodeModal from './copyInviteCodeModal.js';

const playFriendModal = new PlayFriendModal(
  document.getElementById('playFriendModal'),
  {
    modal: new Modal(document.getElementById('playFriendModal')),
    form: document.querySelector('#playFriendModal form'),
    copyInviteCodeModal: copyInviteCodeModal
  }
);

export default playFriendModal;
