import AbstractComponent from '../../../AbstractComponent.js';
import { createGameModal } from './CreateGameModal.js';

export class PlayerButtons extends AbstractComponent {
  mount() {
    this.el.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      createGameModal.props.modal.show();
    });
  }
}

export const playerButtons = new PlayerButtons(document.getElementById('playerButtons'));
