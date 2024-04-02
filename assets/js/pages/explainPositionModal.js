import Modal from 'bootstrap/js/dist/modal.js';

const explainPositionModal = {
  modal: new Modal(document.getElementById('explainPositionModal')),
  form: document.querySelector('#explainPositionModal form'),
  mount: (txt) => {
    const label = document.querySelector('#explainPositionModal label');
    label.classList.add('mb-3');
    label.replaceChildren();
    const explanationText = document.createTextNode(txt);
    label.appendChild(explanationText);
  }
}

explainPositionModal.form.addEventListener('submit', event => {
  event.preventDefault();
  explainPositionModal.modal.hide();
});

export default explainPositionModal;
