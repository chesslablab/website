import { dataWebSocket } from './index.js';
import { gameWebSocket } from './index.js';
import { binaryWebSocket } from './index.js';
import { authWebSocket } from './index.js';
import BaseComponent from '../../BaseComponent.js';
import * as cli from '../../../cli.js';

export class ConsoleForm extends BaseComponent {
  mount() {
    this.props.command.addEventListener('keydown', async (event) => {
      if (event.keyCode === 13) {
        let filtered = event.target.value.replace(/\s+/g, ' ');
        let command = filtered.split(' ')[0];
        let params = null;
        try {
          params = JSON.parse(filtered.substr(filtered.indexOf(' ') + 1));
        } catch {}
        const found = Object.keys(cli).find(key => cli[key] === command);
        if (found?.startsWith('DATA')) {
          dataWebSocket.send(command, params);
        } else if (found?.startsWith('GAME')) {
          gameWebSocket.send(command, params);
        } else if (found?.startsWith('BINARY')) {
          binaryWebSocket.send(command, params);
        } else {
          authWebSocket.send(command, params);
        }
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
