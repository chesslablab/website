import AbstractComponent from '../../AbstractComponent.js';
import * as env from '../../../env.js';

export class ConnectForm extends AbstractComponent {
  mount() {
    env.WEBSOCKET_HOSTS.forEach(item => {
      const option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      this.el.querySelector('select[name="ws"]').append(option);
    });

    env.API_HOSTS.forEach(item => {
      const option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      this.el.querySelector('select[name="api"]').append(option);
    });

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      localStorage.setItem('ws', formData.get('ws'));
      localStorage.setItem('api', formData.get('api'));
      window.location.reload();
    });
  }
}

export const connectForm = new ConnectForm(document.getElementById('connectForm'));
