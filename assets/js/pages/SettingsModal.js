import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../AbstractComponent.js';

export class SettingsModal extends AbstractComponent {
  mount() {
    this.props.a.addEventListener('click', event => {
      event.preventDefault();
      this.props.modal.show();
    });

    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      // TODO
      this.props.modal.hide();
    });
  }
}

export const settingsModal = new SettingsModal(
  document.getElementById('settingsModal'),
  {
    modal: new Modal(document.getElementById('settingsModal')),
    form: document.querySelector('#settingsModal form'),
    a: document.getElementById('mainNavSettingsLink')
  }
);
