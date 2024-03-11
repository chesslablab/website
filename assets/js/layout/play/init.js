import {
  INPUT_EVENT_TYPE,
  COLOR,
  Chessboard,
  BORDER_TYPE,
  Accessibility,
  MARKER_TYPE,
  Markers,
  FEN,
  PromotionDialog
} from '@chesslablab/cmblab';
import {
  GameActionsDropdown,
  HistoryButtons,
  OpeningTable,
  SanMovesTable
} from '@chesslablab/jsblab';
import Modal from 'bootstrap/js/dist/modal.js';
import { gameStudyDropdown } from '../init.js';
import ChesslaBlabWebSocket from '../../ws/play.js';

const inputHandler = (event) => {
  if (event.type === INPUT_EVENT_TYPE.movingOverSquare) {
    return;
  }

  if (event.type !== INPUT_EVENT_TYPE.moveInputFinished) {
    event.chessboard.removeMarkers(MARKER_TYPE.dot);
    event.chessboard.removeMarkers(MARKER_TYPE.bevel);
  }

  if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
    ws.send(`/legal ${event.square}`);
    return true;
  } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
    ws.send(`/play_lan ${event.piece.charAt(0)} ${event.squareFrom}${event.squareTo}`);
    return true;
  }
}

const chessboard = new Chessboard(
  document.getElementById("chessboard"),
  {
    position: FEN.start,
    assetsUrl: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/assets/",
    style: {borderType: BORDER_TYPE.none, pieces: {file: "pieces/staunty.svg"}, animationDuration: 300},
    orientation: COLOR.white,
    extensions: [
      {class: Markers, props: {autoMarkers: MARKER_TYPE.square}},
      {class: PromotionDialog},
      {class: Accessibility, props: {visuallyHidden: true}}
    ]
  }
);

chessboard.enableMoveInput(inputHandler);

const sanMovesTable = new SanMovesTable(
  document.querySelector('#sanMovesTable tbody'),
  {
    chessboard: chessboard,
    inputHandler: inputHandler,
    movetext: '',
    fen: [
      FEN.start
    ]
  }
);

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesTable: sanMovesTable
  }
);

const openingTable = new OpeningTable(
  document.querySelector('#openingTable tbody'),
  {
    movetext: sanMovesTable.props.movetext
  }
);

const startedButtons = document.getElementById('startedButtons');

const gameActionsDropdown = new GameActionsDropdown(
  document.querySelector('#gameActionsDropdown ul'),
  {
    movesTable: sanMovesTable
  }
);

export const ws = new ChesslaBlabWebSocket(
  chessboard,
  sanMovesTable,
  openingTable,
  startedButtons,
  gameActionsDropdown
);

export const playOnline = {
  modal: new Modal(document.getElementById('playOnlineModal')),
  form: document.querySelector('#playOnlineModal form'),
  domElem: (games) => {
    if (games.length > 0) {
      const tbody = document.querySelector('#playOnlineModal table tbody')
      tbody.replaceChildren();
      games.forEach(game => {
        const tr = document.createElement('tr');
        const usernameTd = document.createElement('td');
        const usernameText = document.createTextNode('Guest');
        const minTd = document.createElement('td');
        const minText = document.createTextNode(game.min);
        const incrementTd = document.createElement('td');
        const incrementText = document.createTextNode(game.increment);
        const colorTd = document.createElement('td');
        const colorText = document.createTextNode(game.color);
        const variantTd = document.createElement('td');
        const variantText = document.createTextNode(game.variant);
        usernameTd.appendChild(usernameText);
        minTd.appendChild(minText);
        incrementTd.appendChild(incrementText);
        colorTd.appendChild(colorText);
        variantTd.appendChild(variantText);
        tr.appendChild(usernameTd);
        tr.appendChild(minTd);
        tr.appendChild(incrementTd);
        tr.appendChild(colorTd);
        tr.appendChild(variantTd);
        tr.addEventListener('click', () => {
          ws.send(`/accept ${game.hash}`);
        });
        tbody.appendChild(tr);
      });
    }
  }
}

export const playFriend = {
  modal: new Modal(document.getElementById('playFriendModal')),
  form: document.querySelector('#playFriendModal form')
}

export const copyInviteCode = {
  modal: new Modal(document.getElementById('copyInviteCodeModal')),
  form: document.querySelector('#copyInviteCodeModal form')
}

export const waitingForPlayerToJoin = {
  modal: new Modal(document.getElementById('waitingForPlayerToJoinModal')),
  form: document.querySelector('#waitingForPlayerToJoinModal form')
}

export const enterInviteCode = {
  modal: new Modal(document.getElementById('enterInviteCodeModal')),
  form: document.querySelector('#enterInviteCodeModal form')
}

export * from '../init.js';
