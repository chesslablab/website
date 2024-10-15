import { resultModal } from './ResultModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

try {
  await Promise.all([
  	binaryWebSocket.connect(),
  	dataWebSocket.connect(),
  	analysisWebSocket.connect()
  ]);
} catch {}

resultModal.progressModal.props.modal.show();

dataWebSocket
  .send(`/result`)
  .onChange('/result', data => {
    resultModal.props.result = data;
    resultModal.mount();
    resultModal.props.modal.show();
    resultModal.progressModal.props.modal.hide();
  });
