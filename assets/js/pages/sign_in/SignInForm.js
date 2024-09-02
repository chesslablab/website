import AbstractComponent from '../../AbstractComponent.js';

export class SignInForm extends AbstractComponent {
  mount() {
    this.el.querySelector('.btn-primary').addEventListener('click', (event) => {
      event.preventDefault();
      // TODO ...
    });

    this.el.querySelector('.btn-secondary').addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = event.target.dataset.href;
    });
  }
}

export const signInForm = new SignInForm(document.getElementById('signInForm'));
