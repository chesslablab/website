import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class DatabaseAnnotatedGames extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const databaseAnnotatedGames = new DatabaseAnnotatedGames(
  document.getElementById('databaseAnnotatedGamesModal'),
  {
    modal: new Modal(document.getElementById('databaseAnnotatedGamesModal')),
    form: document.querySelector('#databaseAnnotatedGamesModal form')
  }
);
