import Modal from 'bootstrap/js/dist/modal.js';
import eventAutocomplete from '../../eventAutocomplete.js';
import whiteAutocomplete from '../../whiteAutocomplete.js';

const searchGamesModal = {
  modal: new Modal(document.getElementById('searchGamesModal')),
  form: document.querySelector('#searchGamesModal form')
}

export default searchGamesModal;
