import { openingsNameModal } from './OpeningsNameModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();

openingsNameModal.props.modal.show();
