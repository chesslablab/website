import { openingsSanMovetextModal } from './OpeningsSanMovetextModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

openingsSanMovetextModal.props.modal.show();
