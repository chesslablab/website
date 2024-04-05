import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import searchGamesModal from '../../../elements/searchGamesModal.js';
import { blackAutocomplete } from '../../../pages/BlackAutocomplete.js';
import { whiteAutocomplete } from '../../../pages/WhiteAutocomplete.js';
import { eventAutocomplete } from '../../../pages/EventAutocomplete.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

searchGamesModal.props.modal.show();
