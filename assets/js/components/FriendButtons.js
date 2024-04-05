import AbstractComponent from './AbstractComponent.js';
import enterInviteCodeModal from '../pages/play/online/enterInviteCodeModal.js';
import playFriendModal from '../pages/play/online/playFriendModal.js';

class FriendButtons extends AbstractComponent {
  mount() {
    this.el.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      playFriendModal.modal.show();
    });

    this.el.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      enterInviteCodeModal.props.modal.show();
    });
  }
}

export default FriendButtons;
