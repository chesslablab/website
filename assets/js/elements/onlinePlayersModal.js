import Modal from 'bootstrap/js/dist/modal.js';
import OnlinePlayersModal from '../components/OnlinePlayersModal.js';

const onlinePlayersModal = new OnlinePlayersModal(
  document.getElementById('onlinePlayersModal'),
  {
    modal: new Modal(document.getElementById('onlinePlayersModal')),
    games: []
  }
);

export default onlinePlayersModal;
