import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { openingsSanMovetextModal } from './OpeningsSanMovetextModal.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

openingsSanMovetextModal.props.modal.show();
