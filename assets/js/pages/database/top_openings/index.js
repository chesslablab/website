import topOpeningsModal from './topOpeningsModal.js';
import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import progressModal from '../../../elements/progressModal.js';
import ws from '../../../sanWs.js';
import * as env from '../../../../env.js';

await ws.connect();

localStorage.clear();

progressModal.props.modal.show();

await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/stats/opening`, {
  method: 'GET',
  headers: {
    'X-Api-Key': `${env.API_KEY}`
  }
})
.then(res => res.json())
.then(res => {
  topOpeningsModal.mount(res);
  topOpeningsModal.modal.show();
})
.catch(error => {
  // TODO
})
.finally(() => {
  progressModal.props.modal.hide();
});
