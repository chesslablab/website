import AbstractComponent from '../../AbstractComponent.js';

export class SettingsForm extends AbstractComponent {
  mount() {
    if (localStorage.getItem('locale') === 'es') {
      this.el.querySelector('select[name="locale"]').value = 'es';
    } else if (localStorage.getItem('locale') === 'fr') {
      this.el.querySelector('select[name="locale"]').value = 'fr';
    } else {
      this.el.querySelector('select[name="locale"]').value = 'en';
    }

    if (localStorage.getItem('theme') === 'dark') {
      this.el.querySelector('select[name="theme"]').value = 'dark';
    } else {
      this.el.querySelector('select[name="theme"]').value = 'light';
    }

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      localStorage.setItem('locale', formData.get('locale'));
      localStorage.setItem('theme', formData.get('theme'));
      window.location.reload();
    });
  }
}

export const settingsForm = new SettingsForm(document.getElementById('settingsForm'));
