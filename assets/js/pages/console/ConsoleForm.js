import { gameWebSocket } from './index.js';
import BaseComponent from '../../BaseComponent.js';

export class ConsoleForm extends BaseComponent {
  mount() {
    this.props.command.addEventListener('keydown', async (event) => {
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
    commandP.appendChild(document.createTextNode(this.props.command.value));
    responseP.appendChild(document.createTextNode(msg));
    this.props.response.appendChild(commandP);
    this.props.response.appendChild(responseP);
    this.props.command.value = '';
  }
}

export const consoleForm = new ConsoleForm(
  document.getElementById('consoleForm'),
  {
    command: document.querySelector('textarea[name="command"]'),
    response: document.querySelector('div[id="response"]')
  }
);
