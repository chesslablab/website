import Modal from 'bootstrap/js/dist/modal.js';

const infoModal = {
  modal: new Modal(document.getElementById('infoModal')),
  msg: (txt) => {
    const div = document.querySelector('#infoModal div.message');
    div.replaceChildren();
    div.appendChild(document.createTextNode(txt));
  }
}

export default infoModal;
