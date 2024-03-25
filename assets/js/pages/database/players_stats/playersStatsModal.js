import Modal from 'bootstrap/js/dist/modal.js';
import blackAutocomplete from '../../blackAutocomplete.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import progressModal from '../../progressModal.js';
import whiteAutocomplete from '../../whiteAutocomplete.js';
import ws from '../../../sanWs.js';
import * as env from '../../../../env.js';

const playersStatsModal = {
  modal: new Modal(document.getElementById('playersStatsModal')),
  form: document.querySelector('#playersStatsModal form')
}

playersStatsModal.form.addEventListener('submit', event => {
  event.preventDefault();
  playersStatsModal.modal.hide();
  progressModal.modal.show();
  const formData = new FormData(playersStatsModal.form);
  fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/stats/player`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      White: formData.get('White'),
      Black: formData.get('Black'),
      Result: formData.get('Result')
    })
  })
  .then(res => res.json())
  .then(res => {
    console.log('TODO');
    console.log(res);
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    progressModal.modal.hide();
    playersStatsModal.modal.show();
  });
});

export default playersStatsModal;
