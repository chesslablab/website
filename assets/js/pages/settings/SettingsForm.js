import AbstractComponent from '../../AbstractComponent.js';
import * as env from '../../../env.js';

export class SettingsForm extends AbstractComponent {
  mount() {
    env.SETTINGS.ws.forEach(item => {
      const option = document.createElement('option');
      option.appendChild(document.createTextNode(new URL(item).hostname));
      option.value = item;
      this.el.querySelector('select[name="ws"]').append(option);
    });

    this.el.querySelector('select[name="locale"]').value = localStorage.getItem('locale') ?? env.SETTINGS.locale;
    this.el.querySelector('select[name="theme"]').value = localStorage.getItem('theme') ?? env.SETTINGS.theme;
    this.el.querySelector('select[name="format"]').value = localStorage.getItem('format') ?? env.SETTINGS.format;
    this.el.querySelector('select[name="notation"]').value = localStorage.getItem('notation') ?? env.SETTINGS.notation;
    this.el.querySelector('select[name="set"]').value = localStorage.getItem('set') ?? env.SETTINGS.set;
    this.el.querySelector('select[name="ws"]').value = localStorage.getItem('ws') ?? env.SETTINGS.ws;

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      localStorage.setItem('locale', formData.get('locale'));
      localStorage.setItem('theme', formData.get('theme'));
      localStorage.setItem('format', formData.get('format'));
      localStorage.setItem('notation', formData.get('notation'));
      localStorage.setItem('set', formData.get('set'));
      localStorage.setItem('ws', formData.get('ws'));
      window.location.reload();
    });
  }
}

export const settingsForm = new SettingsForm(document.getElementById('settingsForm'));
