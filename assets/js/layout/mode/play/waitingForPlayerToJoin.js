import Modal from 'bootstrap/js/dist/modal.js';

const waitingForPlayerToJoin = {
  modal: new Modal(document.getElementById('waitingForPlayerToJoinModal')),
  form: document.querySelector('#waitingForPlayerToJoinModal form')
}

export default waitingForPlayerToJoin;
