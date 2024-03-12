import Modal from 'bootstrap/js/dist/modal.js';

const waitingForOpponentToAcceptOrDecline = {
  modal: new Modal(document.getElementById('waitingForOpponentToAcceptOrDeclineModal')),
  form: document.querySelector('#waitingForOpponentToAcceptOrDeclineModal form')
}

export default waitingForOpponentToAcceptOrDecline;
