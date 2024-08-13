import { openingsSearchModal } from './OpeningsSearchModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();

openingsSearchModal.props.modal.show();
