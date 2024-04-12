import AbstractComponent from '../../AbstractComponent.js';

export class SettingsForm extends AbstractComponent {
  mount() {
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      // TODO
    });
  }
}

export const settingsForm = new SettingsForm(document.getElementById('settingsForm'));
