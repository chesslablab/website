import { openingsSanMovetextModal } from './OpeningsSanMovetextModal.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

openingsSanMovetextModal.props.modal.show();
