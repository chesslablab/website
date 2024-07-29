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
      try {
        event.preventDefault();
        this.props.progressModal.props.modal.show();
        const res = await fetch(`${connect.api()}/download/image`, {
          method: 'POST',
          body: JSON.stringify({
            fen: this.props.sanMovesBrowser.props.fen[this.props.sanMovesBrowser.current],
            variant: variant.CLASSICAL,
            flip: this.props.chessboard.getOrientation()
          })
        });
        const url = window.URL.createObjectURL(await res.blob());
        const a = document.createElement('a');
        a.href = url;
        a.download = "chessboard.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
      } finally {
        this.props.progressModal.props.modal.hide();
      }
    });

    this.props.ul.children.item(1).addEventListener('click', async (event) => {
      try {
        event.preventDefault();
        this.props.progressModal.props.modal.show();
        const back = (this.props.sanMovesBrowser.props.fen.length - this.props.sanMovesBrowser.current - 1) * -1;
        const res = await fetch(`${connect.api()}/download/mp4`, {
          method: 'POST',
          body: JSON.stringify({
            variant: this.props.chessboard.props.variant,
            movetext: Movetext.notation(NOTATION_SAN, Movetext.substring(this.props.sanMovesBrowser.props.movetext, back)),
            flip: this.props.chessboard.getOrientation(),
            ...(this.props.chessboard.props.variant === variant.CHESS_960) && {startPos: this.props.chessboard.props.startPos}
          })
        });
        const url = window.URL.createObjectURL(await res.blob());
        const a = document.createElement('a');
        a.href = url;
        a.download = "chessgame.mp4";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
      } finally {
        this.props.progressModal.props.modal.hide();
      }
    });

    this.props.ul.children.item(2).addEventListener('click', async (event) => {
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
