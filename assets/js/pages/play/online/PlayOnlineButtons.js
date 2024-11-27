import BaseComponent from '../../../BaseComponent.js';
import { friendButtons } from './FriendButtons.js';
import { playerButtons } from './PlayerButtons.js';
import { playersButtons } from './PlayersButtons.js';

export const playOnlineButtons = new BaseComponent({
  el: document.querySelector('#playOnlineButtons'),
  props() {
    return({
      friendButtons: friendButtons,
      playerButtons: playerButtons,
      playersButtons: playersButtons
    });
  }
});
