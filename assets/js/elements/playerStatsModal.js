import Modal from 'bootstrap/js/dist/modal.js';
import PlayerStatsModal from '../components/PlayerStatsModal.js';
import movesMetadataTable from './movesMetadataTable.js';
import progressModal from './progressModal.js';

const playerStatsModal = new PlayerStatsModal(
  document.getElementById('playerStatsModal'),
  {
    modal: new Modal(document.getElementById('playerStatsModal')),
    form: document.querySelector('#playerStatsModal form'),
    movesMetadataTable: movesMetadataTable,
    progressModal: progressModal
  }
);

export default playerStatsModal;
