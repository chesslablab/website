import Modal from 'bootstrap/js/dist/modal.js';

const infoModal = {
  modal: new Modal(document.getElementById('infoModal')),
  form: document.querySelector('#infoModal form'),
  msg: (txt) => {
    const div = document.querySelector('#infoModal div.message');
    div.replaceChildren();
    div.appendChild(document.createTextNode(txt));
  }
}

infoModal.form.addEventListener('submit', event => {
  event.preventDefault();
  infoModal.modal.hide();
});

export default infoModal;
