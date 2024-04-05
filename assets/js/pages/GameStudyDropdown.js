import { Movetext } from '@chesslablab/jsblab';
import AbstractComponent from '../AbstractComponent.js';
import * as env from '../../env.js';
import * as variant from '../../variant.js';

export class GameStudyDropdown extends AbstractComponent {
  mount() {
    this.props.ul.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      this.props.progressModal.props.modal.show();
      await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/image`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${env.API_KEY}`
        },
        body: JSON.stringify({
          fen: this.props.sanMovesTable.props.fen[this.props.sanMovesTable.current],
          variant: variant.CLASSICAL,
          flip: this.props.chessboard.getOrientation()
        })
      })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "chessboard.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => {
        // TODO
      })
      .finally(() => {
        this.props.progressModal.props.modal.hide();
      });
    });

    this.props.ul.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      this.props.progressModal.props.modal.show();
      const back = (this.props.sanMovesTable.props.fen.length - this.props.sanMovesTable.current - 1) * -1;
      await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/mp4`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${env.API_KEY}`
        },
        body: JSON.stringify({
          variant: this.props.chessboard.props.variant,
          movetext: Movetext.substring(this.props.sanMovesTable.props.movetext, back),
          flip: this.props.chessboard.getOrientation(),
          ...(this.props.chessboard.props.variant === variant.CHESS_960) && {startPos: this.props.chessboard.props.startPos},
          ...(this.props.chessboard.props.variant === variant.CAPABLANCA_FISCHER) && {startPos: this.props.chessboard.props.startPos}
        })
      })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "chessgame.mp4";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => {
        // TODO
      })
      .finally(() => {
        this.props.progressModal.props.modal.hide();
      });
    });

    this.props.ul.children.item(2).addEventListener('click', async (event) => {
      event.preventDefault();
      this.props.progressModal.props.modal.show();
      const back = (this.props.sanMovesTable.props.fen.length - this.props.sanMovesTable.current - 1) * -1;
      await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/heuristics`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${env.API_KEY}`
        },
        body: JSON.stringify({
          variant: variant.CLASSICAL,
          movetext: Movetext.substring(this.props.sanMovesTable.props.movetext, back),
          ...(this.props.chessboard.props.variant === variant.CHESS_960) && {startPos: this.props.chessboard.props.startPos}
        })
      })
      .then(res => res.json())
      .then(res => {
        this.props.heuristicsModal.props.heuristics = res;
        this.props.heuristicsModal.mount();
      })
      .catch(error => {
        // TODO
      })
      .finally(() => {
        this.props.progressModal.props.modal.hide();
        this.props.heuristicsModal.props.modal.show();
      });
    });
  }
}

export const gameStudyDropdown = new GameStudyDropdown(
  document.getElementById('gameStudyDropdown'),
  {
    ul: document.querySelector('#gameStudyDropdown ul'),
    chessboard: chessboard,
    heuristicsModal: heuristicsModal,
    progressModal: progressModal,
    sanMovesTable: sanMovesTable
  }
);
