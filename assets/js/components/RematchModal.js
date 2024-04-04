import AbstractComponent from './AbstractComponent.js';
import ws from '../playWs.js';

class RematchModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      ws.send('/rematch accept');
    });

    this.props.form.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      ws.send('/rematch decline');
    });
  }
}

export default RematchModal;
