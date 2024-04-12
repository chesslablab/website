import { openingsSanMovetextModal } from './OpeningsSanMovetextModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

openingsSanMovetextModal.props.modal.show();
