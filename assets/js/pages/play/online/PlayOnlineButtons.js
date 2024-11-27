import BaseComponent from '../../../BaseComponent.js';
import { friendButtons } from './FriendButtons.js';
import { playerButtons } from './PlayerButtons.js';
import { playersButtons } from './PlayersButtons.js';

export const playOnlineButtons = new BaseComponent(
  document.querySelector('#playOnlineButtons'),
  {
    friendButtons: friendButtons,
    playerButtons: playerButtons,
    playersButtons: playersButtons
  }
);
