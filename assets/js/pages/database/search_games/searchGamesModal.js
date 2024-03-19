import Modal from 'bootstrap/js/dist/modal.js';

const searchGamesModal = {
  modal: new Modal(document.getElementById('searchGamesModal')),
  form: document.querySelector('#searchGamesModal form')
}

export default searchGamesModal;
