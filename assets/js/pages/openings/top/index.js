import { openingsTopModal } from './OpeningsTopModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();
await dataWebSocket.connect();

dataWebSocket
  .send(`/result`)
  .onChange('/result', data => {
    openingsTopModal.props.result = data['/result'];
    openingsTopModal.mount();
    openingsTopModal.props.modal.show();
  });
