import { openingsEcoCodeModal } from './OpeningsEcoCodeModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();

openingsEcoCodeModal.props.modal.show();
