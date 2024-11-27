import RootComponent from '../RootComponent.js';
import { annotationsWebSocket } from '../websockets/game/AnnotationsWebSocket.js';
import * as variant from '../../variant.js';

export class RavForm extends RootComponent {
  mount() {
    this.el.querySelector('select').addEventListener('change', event => {
      event.preventDefault();
      event.target.value === variant.CHESS_960
        ? this.el.querySelector('.startPos').classList.remove('d-none')
        : this.el.querySelector('.startPos').classList.add('d-none');
    });

    this.el.addEventListener('submit', async event => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const formData = new FormData(this.el);
      annotationsWebSocket.send('/play_rav', {
        variant: formData.get('variant'),
        movetext: formData.get('rav'),
      });
    });
  }
}

export const ravForm = new RavForm({
  el: document.querySelector('#learnForm')
});
