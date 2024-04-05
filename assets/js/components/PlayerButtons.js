import AbstractComponent from './AbstractComponent.js';
import createGameModal from '../elements/createGameModal.js';
import infoModal from '../elements/infoModal.js';
import onlinePlayersModal from '../elements/onlinePlayersModal.js';

class PlayerButtons extends AbstractComponent {
  mount() {
    this.el.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      if (onlinePlayersModal.props.games.length > 0) {
        onlinePlayersModal.props.modal.show();
      } else {
        infoModal.props.msg = 'There are no players connected at the moment, be the first one to create a game!';
        infoModal.mount();
        infoModal.props.modal.show();
      }
    });

    this.el.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      createGameModal.props.modal.show();
    });
  }
}

export default PlayerButtons;
