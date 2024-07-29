import { topOpeningsModal } from './TopOpeningsModal.js';
import { progressModal } from '../../ProgressModal.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';
import * as connect from '../../../../connect.js';
import * as env from '../../../../env.js';

await analysisWebSocket.connect();

sessionStorage.clear();

try {
  progressModal.props.modal.show();
  const res = await fetch(`${connect.api()}/stats/opening`, {
    method: 'GET'
  });
  topOpeningsModal.props.stats = await res.json();
  topOpeningsModal.mount();
  topOpeningsModal.props.modal.show();
} catch (error) {
} finally {
  progressModal.props.modal.hide();
}
