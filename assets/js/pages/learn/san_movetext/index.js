import { sanMovetextModal } from './SanMovetextModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

sanMovetextModal.props.modal.show();
