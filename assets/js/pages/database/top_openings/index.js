import { topOpeningsModal } from './TopOpeningsModal.js';
import { progressModal } from '../../ProgressModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';
import * as env from '../../../../env.js';

await sanWebSocket.connect();

sessionStorage.clear();

progressModal.props.modal.show();

await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/stats/opening`, {
  method: 'GET',
  headers: {
    'X-Api-Key': `${env.API_KEY}`
  }
})
.then(res => res.json())
.then(res => {
  topOpeningsModal.props.stats = res;
  topOpeningsModal.mount();
  topOpeningsModal.props.modal.show();
})
.catch(error => {
  // TODO
})
.finally(() => {
  progressModal.props.modal.hide();
});
