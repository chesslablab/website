import BaseComponent from '../../BaseComponent.js';
import * as connect from '../../connect.js';
import AbstractWebSocket from '../../websockets/AbstractWebSocket.js';

class ConsoleWebSocket extends AbstractWebSocket {
  hints = [
    "Let me suggest you read the docs.",
    "Sorry, I am not an AI prompt.",
    "This command cannot be processed.",
  ];

  async connect(port) {
    await super.connect(`${connect.ws()}:${port}`);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      const output = msg === 'error' 
        ? this.hints[Math.floor(Math.random() * this.hints.length)] 
        : typeof data[msg] === 'string' ? data[msg] : JSON.stringify(data[msg], null, " ");
      consoleForm.print(output);
    };
  }
}

class ConsoleForm extends BaseComponent {
  current = 0;
  stack = [];
  
  mount() {
    this.props.command.addEventListener('keydown', async (event) => {
      if (event.keyCode === 13) {
        let filtered = event.target.value.trim();
        if (filtered.length > 0) {
          let command = filtered.split(' ')[0];
          let params = null;
          try {
            params = JSON.parse(filtered.substr(filtered.indexOf(' ') + 1));
          } catch {}
          if (dataWebSocket.cli.data.includes(command)) {
            dataWebSocket.send(command, params);
          } else if (dataWebSocket.cli.game.includes(command)) {
            gameWebSocket.send(command, params);
          } else if (dataWebSocket.cli.binary.includes(command)) {
            binaryWebSocket.send(command, params);
          } else {
            authWebSocket.send(command, params);
          }
        } else {
          this.print('\n');
        }
      } else if (event.keyCode === 38) {
        if (this.stack.length > 0) {
          if (this.current === 0) {
            this.props.command.value = this.stack[this.current];
          } else if (this.current > 0) {
            this.props.command.value = this.stack[this.current];
            this.current -= 1;
          }
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
    if (msg !== '\n') {
      this.stack.push(filtered);
      this.current = this.stack.length - 1;
    }
  }
}

const dataWebSocket = new ConsoleWebSocket();
const gameWebSocket = new ConsoleWebSocket();
const binaryWebSocket = new ConsoleWebSocket();
const authWebSocket = new ConsoleWebSocket();

try {
  await Promise.all([
    dataWebSocket.connect(9443),
    gameWebSocket.connect(8443),
    binaryWebSocket.connect(7443),
    authWebSocket.connect(6443)
  ]);
} catch {}

const consoleForm = new ConsoleForm({
  el: document.querySelector('#consoleForm'),
  props() {
    return({
      command: this.el.querySelector('textarea[name="command"]'),
      response: this.el.querySelector('div[id="response"]')
    });
  }
});

consoleForm.props.command.focus();