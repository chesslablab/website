import { TimerTable } from '@chesslablab/jsblab';

const timerTable = new TimerTable(
  document.querySelector('#timerTable tbody'),
  {
    turn: 'w',
    w: 0,
    b: 0
  }
);

setInterval(() => {
  timerTable.count().domElem();
}, 1000);

export default timerTable;
