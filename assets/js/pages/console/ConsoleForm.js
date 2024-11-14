import { dataWebSocket } from './index.js';
import { gameWebSocket } from './index.js';
import { binaryWebSocket } from './index.js';
import { authWebSocket } from './index.js';
import BaseComponent from '../../BaseComponent.js';
import { dataCommand } from '../../../command.js';
import { gameCommand } from '../../../command.js';
import { binaryCommand } from '../../../command.js';
import { authCommand } from '../../../command.js';

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
        if (dataCommand.includes(command)) {
          dataWebSocket.send(command, params);
        } else if (gameCommand.includes(command)) {
          gameWebSocket.send(command, params);
        } else if (binaryCommand.includes(command)) {
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
