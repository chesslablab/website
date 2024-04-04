import GameStudyDropdown from '../components/GameStudyDropdown.js';

const gameStudyDropdown = new GameStudyDropdown(
  document.getElementById('gameStudyDropdown'),
  {
    ul: document.querySelector('#gameStudyDropdown ul')
  }
);

export default gameStudyDropdown
