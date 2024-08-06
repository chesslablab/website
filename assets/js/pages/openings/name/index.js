import { openingsNameModal } from './OpeningsNameModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

openingsNameModal.props.modal.show();
