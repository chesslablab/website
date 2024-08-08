import { topOpeningsModal } from './TopOpeningsModal.js';
import { progressModal } from '../../../ProgressModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();

await dataWebSocket.connect();

dataWebSocket
  .send(`/stats_opening`)
  .watch('/stats_opening', data => {
    topOpeningsModal.props.stats = data['/stats_opening'];
    topOpeningsModal.mount();
    topOpeningsModal.props.modal.show();
    progressModal.props.modal.hide();
  });
