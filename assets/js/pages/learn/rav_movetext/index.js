import boardActionsDropdown from './boardActionsDropdown.js';
import historyButtons from './historyButtons.js';
import ravMovesBrowser from './ravMovesBrowser.js';
import { ravMovetextModal } from './ravMovetextModal.js';
import chessboard from '../../chessboard.js';
import { progressModal } from '../../ProgressModal.js';

sessionStorage.clear();

ravMovetextModal.props.modal.show();
