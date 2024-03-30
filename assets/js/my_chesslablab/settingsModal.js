import Modal from 'bootstrap/js/dist/modal.js';

const settingsModal = {
  modal: new Modal(document.getElementById('settingsModal')),
  form: document.querySelector('#settingsModal form')
}

settingsModal.form.querySelector('button#deleteAccount').addEventListener('click', event => {
  event.preventDefault();
  console.log('TODO');
});

export default settingsModal;
