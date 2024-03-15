import { TimerTable } from '@chesslablab/jsblab';

export const timerTable = new TimerTable(
  document.querySelector('#timerTable tbody'),
  {
    turn: 'w',
    w: 0,
    b: 0
  }
);

export const timerTableInterval = setInterval(() => {
  timerTable.count().domElem();
}, 1000);
