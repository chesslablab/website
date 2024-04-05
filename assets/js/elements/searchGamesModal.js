import Modal from 'bootstrap/js/dist/modal.js';
import SearchGamesModal from '../components/SearchGamesModal.js';
import movesMetadataTable from './movesMetadataTable.js';
import progressModal from './progressModal.js';

const searchGamesModal = new SearchGamesModal(
  document.getElementById('searchGamesModal'),
  {
    modal: new Modal(document.getElementById('searchGamesModal')),
    form: document.querySelector('#searchGamesModal form'),
    movesMetadataTable: movesMetadataTable,
    progressModal: progressModal
  }
);

export default searchGamesModal;
