import AbstractComponent from './AbstractComponent.js';

class FriendButtons extends AbstractComponent {
  mount() {
    this.el.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      this.props.playFriendModal.modal.show();
    });

    this.el.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      this.props.enterInviteCodeModal.props.modal.show();
    });
  }
}

export default FriendButtons;
