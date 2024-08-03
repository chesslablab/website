import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import chessboard from './chessboard.js';
import { heuristicsModal } from './HeuristicsModal.js';
import { progressModal } from './ProgressModal.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import AbstractComponent from '../AbstractComponent.js';
import * as connect from '../../connect.js';
import * as env from '../../env.js';
import * as variant from '../../variant.js';

export class GameStudyDropdown extends AbstractComponent {
  mount() {
    this.props.ul.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      this.props.heuristicsModal.props.chart.replaceChildren();
      this.props.heuristicsModal.props.form.getElementsByTagName('select')[0].value = '';
      this.props.heuristicsModal.props.modal.show();
    });
  }
}

export const gameStudyDropdown = new GameStudyDropdown(
  document.getElementById('gameStudyDropdown'),
  {
    ul: document.querySelector('#gameStudyDropdown ul'),
    chessboard: chessboard,
    heuristicsModal: heuristicsModal,
    sanMovesBrowser: sanMovesBrowser,
    progressModal: progressModal
  }
);
