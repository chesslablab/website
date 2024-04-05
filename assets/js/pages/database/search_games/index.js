import blackAutocomplete from '../../../elements/blackAutocomplete.js';
import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import eventAutocomplete from '../../../elements/eventAutocomplete.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import searchGamesModal from '../../../elements/searchGamesModal.js';
import whiteAutocomplete from '../../../elements/whiteAutocomplete.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

searchGamesModal.props.modal.show();
