import GameStudyDropdown from '../components/GameStudyDropdown.js';
import chessboard from './chessboard.js';
import heuristicsModal from './heuristicsModal.js';
import progressModal from './progressModal.js';
import sanMovesTable from './sanMovesTable.js';

const gameStudyDropdown = new GameStudyDropdown(
  document.getElementById('gameStudyDropdown'),
  {
    ul: document.querySelector('#gameStudyDropdown ul'),
    chessboard: chessboard,
    heuristicsModal: heuristicsModal,
    progressModal: progressModal,
    sanMovesTable: sanMovesTable
  }
);

export default gameStudyDropdown
