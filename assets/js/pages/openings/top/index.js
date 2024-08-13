import { openingsTopModal } from './OpeningsTopModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();
await dataWebSocket.connect();

dataWebSocket
  .send(`/stats_opening`)
  .onChange('/stats_opening', data => {
    openingsTopModal.props.stats = data['/stats_opening'];
    openingsTopModal.mount();
    openingsTopModal.props.modal.show();
  });
