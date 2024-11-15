import { dataWebSocket } from './index.js';
import { gameWebSocket } from './index.js';
import { binaryWebSocket } from './index.js';
import { authWebSocket } from './index.js';
import BaseComponent from '../../BaseComponent.js';
import * as cli from '../../../cli.js';

export class ConsoleForm extends BaseComponent {
  current = 0;
  stack = [];
  mount() {
    this.props.command.addEventListener('keydown', async (event) => {
      if (event.keyCode === 13) {
        let filtered = event.target.value.trim();
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
      } else if (event.keyCode === 38) {
        if (this.current === 0) {
          this.props.command.value = this.stack[this.current];
        } else if (this.current > 0) {
          this.props.command.value = this.stack[this.current];
          this.current -= 1;
        }
      } else if (event.keyCode === 40) {
        if (this.current === this.stack.length - 1) {
          this.props.command.value = this.stack[this.current];
        } else if (this.current < this.stack.length) {
          this.props.command.value = this.stack[this.current];
          this.current += 1;
        }
      }
    });
  }

  print(msg) {
    const filtered = this.props.command.value.replace(/(\r\n|\n|\r)/gm,'');
    const commandP = document.createElement('p');
    const responseP = document.createElement('p');
    commandP.appendChild(document.createTextNode(filtered));
    responseP.appendChild(document.createTextNode(msg));
    this.props.response.appendChild(commandP);
    this.props.response.appendChild(responseP);
    this.props.command.value = '';
    this.stack.push(filtered);
    this.current = this.stack.length - 1;
  }
}

export const consoleForm = new ConsoleForm(
  document.getElementById('consoleForm'),
  {
    command: document.querySelector('textarea[name="command"]'),
    response: document.querySelector('div[id="response"]')
  }
);
