import Modal from 'bootstrap/js/dist/modal.js';

const explainPositionModal = {
  modal: new Modal(document.getElementById('explainPositionModal')),
  mount: (txt) => {
    const label = document.querySelector('#explainPositionModal label');
    label.classList.remove('d-none');
    label.replaceChildren();
    const explanationText = document.createTextNode(txt);
    label.appendChild(explanationText);
  }
}

export default explainPositionModal;
