import RootComponent from '../../RootComponent.js';
import * as env from '../../../env.js';

export class SettingsForm extends RootComponent {
  mount() {
    env.WEBSOCKET_SERVER.forEach(item => {
      const option = document.createElement('option');
      option.appendChild(document.createTextNode(new URL(item).hostname));
      option.value = item;
      this.el.querySelector('select[name="ws"]').append(option);
    });

    if (localStorage.getItem('theme') === 'light') {
      this.el.querySelector('select[name="theme"]').value = 'light';
    } else {
      this.el.querySelector('select[name="theme"]').value = 'dark';
    }

    if (localStorage.getItem('format') === 'table') {
      this.el.querySelector('select[name="format"]').value = 'table';
    } else {
      this.el.querySelector('select[name="format"]').value = 'inline';
    }

    if (localStorage.getItem('notation') === 'san') {
      this.el.querySelector('select[name="notation"]').value = 'san';
    } else {
      this.el.querySelector('select[name="notation"]').value = 'fan';
    }

    if (localStorage.getItem('set') === 'staunty') {
      this.el.querySelector('select[name="set"]').value = 'staunty';
    } else {
      this.el.querySelector('select[name="set"]').value = 'classical';
    }

    if (localStorage.getItem('ws')) {
      this.el.querySelector('select[name="ws"]').value = localStorage.getItem('ws');
    }

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

export const settingsForm = new SettingsForm({
  el: document.querySelector('#settingsForm')
});
