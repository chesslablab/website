import { fenStringModal } from './FenStringModal.js';
import { fenWebSocket } from '../../../FenWebSocket.js';

await fenWebSocket.connect();

sessionStorage.clear();

fenStringModal.props.modal.show();
