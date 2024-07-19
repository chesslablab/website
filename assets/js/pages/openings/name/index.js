import { openingsNameModal } from './OpeningsNameModal.js';
import { sanWebSocket } from '../../../AnalysisWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

openingsNameModal.props.modal.show();
