import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { openingsNameModal } from './OpeningsNameModal.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

openingsNameModal.props.modal.show();
