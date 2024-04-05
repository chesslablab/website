import AbstractComponent from './AbstractComponent.js';
import ws from '../playWs.js';

class DrawModal extends AbstractComponent {
  mount() {
    this.props.form.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      ws.send('/draw accept');
    });

    this.props.form.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      ws.send('/draw decline');
    });
  }
}

export default DrawModal;
