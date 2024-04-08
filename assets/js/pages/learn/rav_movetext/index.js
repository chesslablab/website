import boardActionsDropdown from './boardActionsDropdown.js';
import historyButtons from './historyButtons.js';
import ravMovesTable from './ravMovesTable.js';
import { ravMovetextModal } from './ravMovetextModal.js';
import chessboard from '../../chessboard.js';
import { progressModal } from '../../ProgressModal.js';

localStorage.clear();

ravMovetextModal.props.modal.show();
