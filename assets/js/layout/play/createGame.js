import Modal from 'bootstrap/js/dist/modal.js';

const createGame = {
  modal: new Modal(document.getElementById('createGameModal')),
  form: document.querySelector('#createGameModal form')
}

export default createGame;
