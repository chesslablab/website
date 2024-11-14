import { gameWebSocket } from './index.js';
import BaseComponent from '../../BaseComponent.js';

export class ConsoleForm extends BaseComponent {
  mount() {
    this.el.querySelector('textarea[name="command"]').focus();

    this.el.querySelector('textarea[name="command"]').addEventListener('keydown', async (event) => {
      if (event.keyCode === 13) {
        let filtered = event.target.value.replace(/\s+/g, ' ');
        let words = filtered.split(' ');
        let command = words[0];
        let params = null;

        words = words.slice(1);
        if (words.length > 1) {
          params = JSON.parse(words.join(''));
        } else if (words.length === 1) {
          command += ` ${words[0]}`;
        }

        gameWebSocket.send(command, params);
      }
    });
  }

  print(msg) {
    const commandP = document.createElement('p');
    const responseP = document.createElement('p');
    commandP.appendChild(document.createTextNode(this.el.querySelector('textarea[name="command"]').value));
    responseP.appendChild(document.createTextNode(msg));
    this.el.querySelector('div[id="response"]').appendChild(commandP);
    this.el.querySelector('div[id="response"]').appendChild(responseP);
    this.el.querySelector('textarea[name="command"]').value = '';
  }
}

export const consoleForm = new ConsoleForm(document.getElementById('consoleForm'));
