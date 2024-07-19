import { openingsEcoCodeModal } from './OpeningsEcoCodeModal.js';
import { sanWebSocket } from '../../../AnalysisWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

openingsEcoCodeModal.props.modal.show();
