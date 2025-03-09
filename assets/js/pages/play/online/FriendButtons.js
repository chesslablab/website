import BaseComponent from '../../../BaseComponent.js';
import { enterInviteCodeModal } from './EnterInviteCodeModal.js';
import { playFriendModal } from './PlayFriendModal.js';

export class FriendButtons extends BaseComponent {
  mount() {
    this.el.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      this.props.playFriendModal.props.modal.show();
    });

    this.el.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      this.props.enterInviteCodeModal.props.modal.show();
    });
  }
}

export const friendButtons = new FriendButtons({
  el: document.querySelector('#friendButtons'),
  props() {
    return({
      enterInviteCodeModal: enterInviteCodeModal,
      playFriendModal: playFriendModal
    });
  }
});
