import AbstractComponent from '../../AbstractComponent.js';

export class SettingsForm extends AbstractComponent {
  mount() {
    if (localStorage.getItem('theme') === 'dark') {
      this.el.querySelector('select[name="theme"]').value = 'dark';
    } else {
      this.el.querySelector('select[name="theme"]').value = 'light';
    }

    this.el.querySelector('select[name="theme"]').addEventListener('change', event => {
      localStorage.setItem('theme', event.target.value);
    });

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      localStorage.setItem('theme', formData.get('theme'));
      window.location.reload();
    });
  }
}

export const settingsForm = new SettingsForm(document.getElementById('settingsForm'));
