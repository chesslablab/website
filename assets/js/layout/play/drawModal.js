import Modal from 'bootstrap/js/dist/modal.js';

const drawModal = {
  modal: new Modal(document.getElementById('drawModal')),
  form: document.querySelector('#drawModal form')
}

export default drawModal;
