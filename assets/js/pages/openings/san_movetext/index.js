import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { openingsSanMovetextModal } from './OpeningsSanMovetextModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

localStorage.clear();

openingsSanMovetextModal.props.modal.show();
