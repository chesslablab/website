import Modal from 'bootstrap/js/dist/modal.js';

const heuristicsModal = {
  modal: new Modal(document.getElementById('heuristicsModal')),
  form: document.querySelector('#heuristicsModal form')
}

heuristicsModal.form.addEventListener('submit', event => {
  event.preventDefault();
  heuristicsModal.modal.hide();
});

export default heuristicsModal;
