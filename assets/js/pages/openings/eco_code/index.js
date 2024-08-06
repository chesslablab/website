import { openingsEcoCodeModal } from './OpeningsEcoCodeModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

openingsEcoCodeModal.props.modal.show();
