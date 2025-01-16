import jsCookie from 'js-cookie';
import BaseComponent from '../../BaseComponent.js';
import { authWebSocket } from '../../websockets/auth/AuthWebSocket.js';

class SignInForm extends BaseComponent {
  mount() {
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      authWebSocket
        .send('/totp_signin', {
          username: formData.get('username'),
          password: formData.get('password')
        })
        .onChange('/totp_signin', data => {
          if (data?.access_token) {
            jsCookie.set('access_token', data.access_token);
            window.location.href = this.el.dataset.pages_play_online;
          } else {
            window.location.href = this.el.dataset.totp_auth_signout;
          }
        });
    });
  }
}

try {
  await Promise.all([
    authWebSocket.connect()
  ]);
} catch {}

const signInForm = new SignInForm({
  el: document.querySelector('#signInForm')
});
