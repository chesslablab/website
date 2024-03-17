import Modal from 'bootstrap/js/dist/modal.js';

const databaseAnnotatedGames = {
  modal: new Modal(document.getElementById('databaseAnnotatedGamesModal')),
  form: document.querySelector('#databaseAnnotatedGamesModal form')
}

export default databaseAnnotatedGames;
