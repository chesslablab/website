import { topOpeningsModal } from './TopOpeningsModal.js';
import { progressModal } from '../../ProgressModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

try {
  await dataWebSocket.connect();
  dataWebSocket.send(`/stats_opening`);
  dataWebSocket.watch('/stats_opening', (newValue, oldValue) => {
    topOpeningsModal.props.stats = newValue['/stats_opening'];
    topOpeningsModal.mount();
    topOpeningsModal.props.modal.show();
  });
} catch (error) {
} finally {
  progressModal.props.modal.hide();
}
