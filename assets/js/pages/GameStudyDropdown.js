import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import chessboard from './chessboard.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import AbstractComponent from '../AbstractComponent.js';
import * as connect from '../../connect.js';
import * as env from '../../env.js';
import * as variant from '../../variant.js';

export class GameStudyDropdown extends AbstractComponent {
  mount() {
    // ...
  }
}

export const gameStudyDropdown = new GameStudyDropdown(
  document.getElementById('gameStudyDropdown'),
  {
    ul: document.querySelector('#gameStudyDropdown ul'),
    chessboard: chessboard,
    sanMovesBrowser: sanMovesBrowser
  }
);
