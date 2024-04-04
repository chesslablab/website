import AbstractComponent from './AbstractComponent.js';
import ws from '../playWs.js';

class TakebackModal extends AbstractComponent {
  mount() {
    this.props.form.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      ws.send('/takeback accept');
      ws.send('/undo');
    });

    this.props.form.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      ws.send('/takeback decline');
    });
  }
}

export default TakebackModal;
