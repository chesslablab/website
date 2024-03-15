import chessboardFenString from './layout/fen/chessboardFenString.js';
import startedButtons from './layout/fen/startedButtons.js';
import ws from './layout/fen/ws.js';
import gameActionsDropdown from './layout/gameActionsDropdown.js';
import gameStudyDropdown from './layout/gameStudyDropdown.js';
import historyButtons from './layout/historyButtons.js';
import * as mode from '../mode.js';

localStorage.clear();

chessboardFenString.form.addEventListener('submit', event => {
  event.preventDefault();
  const add = {
    fen: event.target.elements[1].value
  };
  ws.send(`/start ${event.target.elements[0].value} ${mode.FEN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  chessboardFenString.modal.hide();
});
