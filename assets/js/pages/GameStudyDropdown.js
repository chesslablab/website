import AbstractComponent from '../AbstractComponent.js';

export class GameStudyDropdown extends AbstractComponent {
  mount() {
    // ...
  }
}

export const gameStudyDropdown = new GameStudyDropdown(
  document.getElementById('gameStudyDropdown'),
  {
    ul: document.querySelector('#gameStudyDropdown ul')
  }
);
