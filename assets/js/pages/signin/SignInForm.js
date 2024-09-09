import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm';
import AbstractComponent from '../../AbstractComponent.js';
import { dataWebSocket } from '../../websockets/data/DataWebSocket.js';

export class SignInForm extends AbstractComponent {
  mount() {
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      const params = {
        username: formData.get('username'),
        password: formData.get('password')
      };
      dataWebSocket
        .send(`/totp_signin "${JSON.stringify(params).replace(/"/g, '\\"')}"`)
        .onChange('/totp_signin', data => {
          if (data?.ui) {
            jsCookie.set('ui', data.ui);
            window.location.href = this.el.dataset.pages_play_online;
          } else {
            window.location.href = this.el.dataset.totp_auth_signout;
          }
        });
    });
  }
}

export const signInForm = new SignInForm(document.getElementById('signInForm'));
