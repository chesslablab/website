import BaseComponent from '../../BaseComponent.js';
import * as env from '../../../env.js';

class SettingsForm extends BaseComponent {
  mount() {
    env.WEBSOCKET_SERVER.forEach(item => {
      const option = document.createElement('option');
      option.appendChild(document.createTextNode(new URL(item).hostname));
      option.value = item;
      this.el.querySelector('select[name="ws"]').append(option);
    });
    this.el.querySelector('select[name="theme"]').value = localStorage.getItem('theme') ?? 'dark';
    this.el.querySelector('select[name="format"]').value = localStorage.getItem('format') ?? 'inline';
    this.el.querySelector('select[name="notation"]').value = localStorage.getItem('notation') ?? 'fan';
    this.el.querySelector('select[name="set"]').value = localStorage.getItem('set') ?? 'classical';
    this.el.querySelector('select[name="ws"]').value = localStorage.getItem('ws') ?? 'random';
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      localStorage.setItem('theme', formData.get('theme'));
      localStorage.setItem('format', formData.get('format'));
      localStorage.setItem('notation', formData.get('notation'));
      localStorage.setItem('set', formData.get('set'));
      localStorage.setItem('ws', formData.get('ws'));
      window.location.reload();
    });
  }
}

const settingsForm = new SettingsForm({
  el: document.querySelector('#settingsForm')
});
