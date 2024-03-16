import Modal from 'bootstrap/js/dist/modal.js';

const takebackModal = {
  modal: new Modal(document.getElementById('takebackModal')),
  form: document.querySelector('#takebackModal form')
}

export default takebackModal;
