import { openingsNameModal } from './OpeningsNameModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

openingsNameModal.props.modal.show();
