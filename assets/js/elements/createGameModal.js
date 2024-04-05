import Modal from 'bootstrap/js/dist/modal.js';
import CreateGameModal from '../components/CreateGameModal.js';
import onlinePlayersModal from './onlinePlayersModal.js';

const createGameModal = new CreateGameModal(
  document.getElementById('createGameModal'),
  {
    modal: new Modal(document.getElementById('createGameModal')),
    form: document.querySelector('#createGameModal form'),
    onlinePlayersModal: onlinePlayersModal
  }
);

export default createGameModal;
