import playComputer from './playComputer.js';
import startedButtons from './startedButtons.js';
import ws from './ws.js';
import gameActionsDropdown from '../gameActionsDropdown.js';
import gameStudyDropdown from '../gameStudyDropdown.js';
import historyButtons from '../historyButtons.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

playComputer.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playComputer.form);
  localStorage.clear();
  localStorage.setItem('mode', mode.STOCKFISH);
  if (formData.get('level') == 1) {
    localStorage.setItem('skillLevel', 11);
    localStorage.setItem('depth', 4);
  } else if (formData.get('level') == 2) {
    localStorage.setItem('skillLevel', 17);
    localStorage.setItem('depth', 8);
  } else if (formData.get('level') == 3) {
    localStorage.setItem('skillLevel', 20);
    localStorage.setItem('depth', 12);
  } else {
    localStorage.setItem('skillLevel', 6);
    localStorage.setItem('depth', 2);
  }
  ws.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} ${formData.get('color')}`);
  playComputer.modal.hide();
});
