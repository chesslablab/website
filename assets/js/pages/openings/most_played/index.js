import { resultModal } from './ResultModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();
await dataWebSocket.connect();

dataWebSocket
  .send(`/result`)
  .onChange('/result', data => {
    resultModal.props.result = data;
    resultModal.mount();
    resultModal.props.modal.show();
  });
