import { topOpeningsModal } from './TopOpeningsModal.js';
import { progressModal } from '../../ProgressModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';
import * as env from '../../../../env.js';

await sanWebSocket.connect();

sessionStorage.clear();

try {
  progressModal.props.modal.show();
  const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/stats/opening`, {
    method: 'GET'
  });
  topOpeningsModal.props.stats = await res.json();
  topOpeningsModal.mount();
  topOpeningsModal.props.modal.show();
} catch (error) {
} finally {
  progressModal.props.modal.hide();
}
