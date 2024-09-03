import AbstractComponent from '../../AbstractComponent.js';
import { dataWebSocket } from '../../websockets/data/DataWebSocket.js';

export class SignInForm extends AbstractComponent {
  mount() {
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      const settings = {
        username: formData.get('username'),
        password: formData.get('password')
      };
      dataWebSocket
        .send(`/totp_signin "${JSON.stringify(settings).replace(/"/g, '\\"')}"`)
        .onChange('/totp_signin', data => {
          if (data?.username) {
            fetch(this.el.dataset.signin, {
              method: 'POST',
              body: JSON.stringify({
                username: data.username
              })
            }).then(() => {
              window.location.href = this.el.dataset.redirect;
            });
          } else {
            window.location.href = this.el.dataset.signout;
          }
        });
    });
  }
}

export const signInForm = new SignInForm(document.getElementById('signInForm'));
