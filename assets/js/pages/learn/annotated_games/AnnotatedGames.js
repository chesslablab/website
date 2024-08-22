import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class AnnotatedGames extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const annotatedGames = new AnnotatedGames(
  document.getElementById('annotatedGamesModal'),
  {
    modal: new Modal(document.getElementById('annotatedGamesModal')),
    form: document.querySelector('#annotatedGamesModal form')
  }
);
