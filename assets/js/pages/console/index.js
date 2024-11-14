import { consoleForm } from './ConsoleForm.js';
import AbstractWebSocket from '../../AbstractWebSocket.js';
import * as connect from '../../connect.js';

class DataWebSocket extends AbstractWebSocket {
  static PORT = 9443;
  async connect() {
    await super.connect(`${connect.ws()}:${GameWebSocket.PORT}`);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      switch (msg) {
        case 'error':
          consoleForm.print('Whoops! Something went wrong with this command.');
          break;

        default:
          consoleForm.print(JSON.stringify(data[msg]));
          break;
      }
    };
  }
}

class GameWebSocket extends AbstractWebSocket {
  static PORT = 8443;
  async connect() {
    await super.connect(`${connect.ws()}:${GameWebSocket.PORT}`);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      switch (msg) {
        case 'error':
          consoleForm.print('Whoops! Something went wrong with this command.');
          break;

        default:
          consoleForm.print(JSON.stringify(data[msg]));
          break;
      }
    };
  }
}

class BinaryWebSocket extends AbstractWebSocket {
  static PORT = 7443;
  async connect() {
    await super.connect(`${connect.ws()}:${GameWebSocket.PORT}`);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      switch (msg) {
        case 'error':
          consoleForm.print('Whoops! Something went wrong with this command.');
          break;

        default:
          consoleForm.print(JSON.stringify(data[msg]));
          break;
      }
    };
  }
}

class AuthWebSocket extends AbstractWebSocket {
  static PORT = 6443;
  async connect() {
    await super.connect(`${connect.ws()}:${GameWebSocket.PORT}`);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      switch (msg) {
        case 'error':
          consoleForm.print('Whoops! Something went wrong with this command.');
          break;

        default:
          consoleForm.print(JSON.stringify(data[msg]));
          break;
      }
    };
  }
}

export const dataWebSocket = new DataWebSocket();
export const gameWebSocket = new GameWebSocket();
export const binaryWebSocket = new BinaryWebSocket();
export const authWebSocket = new AuthWebSocket();

try {
  await Promise.all([
    dataWebSocket.connect(),
    gameWebSocket.connect(),
    binaryWebSocket.connect(),
    authWebSocket.connect()
  ]);
} catch {}

consoleForm.props.command.focus();
