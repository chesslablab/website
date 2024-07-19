import { openingsSanMovetextModal } from './OpeningsSanMovetextModal.js';
import { sanWebSocket } from '../../../AnalysisWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

openingsSanMovetextModal.props.modal.show();
