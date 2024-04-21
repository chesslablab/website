import { openingsSanMovetextModal } from './OpeningsSanMovetextModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

openingsSanMovetextModal.props.modal.show();
