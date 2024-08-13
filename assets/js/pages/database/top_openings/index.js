import { topOpeningsModal } from './TopOpeningsModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();
await dataWebSocket.connect();

dataWebSocket
  .send(`/stats_opening`)
  .onChange('/stats_opening', data => {
    topOpeningsModal.props.stats = data['/stats_opening'];
    topOpeningsModal.mount();
    topOpeningsModal.props.modal.show();
  });
