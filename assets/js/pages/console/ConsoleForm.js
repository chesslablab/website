import BaseComponent from '../../BaseComponent.js';

export class ConsoleForm extends BaseComponent {
  mount() {
    this.el.querySelector('textarea[name="command"]').focus();
  }
}

export const consoleForm = new ConsoleForm(document.getElementById('consoleForm'));
