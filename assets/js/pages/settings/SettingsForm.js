import AbstractComponent from '../../AbstractComponent.js';

export class SettingsForm extends AbstractComponent {
  mount() {
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      localStorage.setItem('darkLightModeCheckbox', formData.get('darkLightModeCheckbox'));
      // TODO
    });
  }
}

export const settingsForm = new SettingsForm(document.getElementById('settingsForm'));
