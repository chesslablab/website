import BaseComponent from '../../../BaseComponent.js';
import { createGameModal } from './CreateGameModal.js';

export class PlayerButtons extends BaseComponent {
  mount() {
    this.el.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      createGameModal.props.modal.show();
    });
  }
}

export const playerButtons = new PlayerButtons(document.querySelector('#playerButtons'));
