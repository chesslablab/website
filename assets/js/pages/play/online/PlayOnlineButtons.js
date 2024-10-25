import AbstractComponent from '../../../AbstractComponent.js';
import { friendButtons } from './FriendButtons.js';
import { playerButtons } from './PlayerButtons.js';
import { playersButtons } from './PlayersButtons.js';

export class PlayOnlineButtons extends AbstractComponent {
}

export const playOnlineButtons = new PlayOnlineButtons(
  document.getElementById('playOnlineButtons'),
  {
    friendButtons: friendButtons,
    playerButtons: playerButtons,
    playersButtons: playersButtons
  }
);
