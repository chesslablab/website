import RootComponent from '../../../RootComponent.js';
import { createGameModal } from './CreateGameModal.js';

export class PlayerButtons extends RootComponent {
  mount() {
    this.el.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      createGameModal.props.modal.show();
    });
  }
}

export const playerButtons = new PlayerButtons({
  el: document.querySelector('#playerButtons')
});
