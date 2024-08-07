import { openingsSanMovetextModal } from './OpeningsSanMovetextModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();

openingsSanMovetextModal.props.modal.show();
