import { Movetext } from '@chesslablab/jsblab';
import AbstractComponent from './AbstractComponent.js';
import chessboard from '../pages/chessboard.js';
import heuristicsModal from '../pages/heuristicsModal.js';
import progressModal from '../pages/progressModal.js';
import sanMovesTable from '../pages/sanMovesTable.js';
import * as env from '../../env.js';
import * as variant from '../../variant.js';

class GameStudyDropdown extends AbstractComponent {
  mount() {
    this.props.ul.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      progressModal.props.modal.show();
      await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/image`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${env.API_KEY}`
        },
        body: JSON.stringify({
          fen: sanMovesTable.props.fen[sanMovesTable.current],
          variant: variant.CLASSICAL,
          flip: chessboard.getOrientation()
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
        progressModal.props.modal.hide();
      });
    });

    this.props.ul.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      progressModal.props.modal.show();
      const back = (sanMovesTable.props.fen.length - sanMovesTable.current - 1) * -1;
      await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/mp4`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${env.API_KEY}`
        },
        body: JSON.stringify({
          variant: chessboard.props.variant,
          movetext: Movetext.substring(sanMovesTable.props.movetext, back),
          flip: chessboard.getOrientation(),
          ...(chessboard.props.variant === variant.CHESS_960) && {startPos: chessboard.props.startPos},
          ...(chessboard.props.variant === variant.CAPABLANCA_FISCHER) && {startPos: chessboard.props.startPos}
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
        progressModal.props.modal.hide();
      });
    });

    this.props.ul.children.item(2).addEventListener('click', async (event) => {
      event.preventDefault();
      progressModal.props.modal.show();
      const back = (sanMovesTable.props.fen.length - sanMovesTable.current - 1) * -1;
      await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/heuristics`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${env.API_KEY}`
        },
        body: JSON.stringify({
          variant: variant.CLASSICAL,
          movetext: Movetext.substring(sanMovesTable.props.movetext, back),
          ...(chessboard.props.variant === variant.CHESS_960) && {startPos: chessboard.props.startPos}
        })
      })
      .then(res => res.json())
      .then(res => {
        heuristicsModal.props.heuristics = res;
        heuristicsModal.mount();
      })
      .catch(error => {
        // TODO
      })
      .finally(() => {
        progressModal.props.modal.hide();
        heuristicsModal.props.modal.show();
      });
    });
  }
}

export default GameStudyDropdown;
