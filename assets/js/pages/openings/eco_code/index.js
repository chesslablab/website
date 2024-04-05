import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { openingsEcoCodeModal } from './OpeningsEcoCodeModal.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

openingsEcoCodeModal.props.modal.show();
