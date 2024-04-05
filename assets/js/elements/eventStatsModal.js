import Modal from 'bootstrap/js/dist/modal.js';
import EventStatsModal from '../components/EventStatsModal.js';
import movesMetadataTable from './movesMetadataTable.js';
import progressModal from './progressModal.js';

const eventStatsModal = new EventStatsModal(
  document.getElementById('eventStatsModal'),
  {
    modal: new Modal(document.getElementById('eventStatsModal')),
    form: document.querySelector('#eventStatsModal form'),
    movesMetadataTable: movesMetadataTable,
    progressModal: progressModal
  }
);

export default eventStatsModal;
