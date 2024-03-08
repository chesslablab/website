import {
  Chessboard,
  FEN
} from '@chesslablab/cmblab';
import {
  GameActionsDropdown,
  HistoryButtons,
  RavMovesTable
} from '@chesslablab/jsblab';
import Modal from 'bootstrap/js/dist/modal.js';

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------

const props = {
  filtered: '',
  breakdown: [
    ''
  ],
  fen: [
    FEN.start
  ]
};

const chessboard = new Chessboard(
  document.getElementById('chessboard'),
  {
    assetsUrl: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/assets/",
    position: props.fen[props.fen.length - 1],
    style: {pieces: {file: "pieces/staunty.svg"}}
  }
);

export const ravMovesTable = new RavMovesTable(
  document.querySelector('#ravMovesTable tbody'),
  {
    ...props,
    chessboard: chessboard
  }
);

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesTable: ravMovesTable
  }
);

const gameActionsDropdown = new GameActionsDropdown(
  document.querySelector('#gameActionsDropdown ul'),
  {
    movesTable: ravMovesTable
  }
);

export const databaseAnnotatedGames = {
  modal: new Modal(document.getElementById('databaseAnnotatedGamesModal')),
  form: document.querySelector('#databaseAnnotatedGamesModal form')
}
