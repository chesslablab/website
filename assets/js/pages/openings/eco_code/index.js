import { openingsEcoCodeModal } from './OpeningsEcoCodeModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

openingsEcoCodeModal.props.modal.show();
