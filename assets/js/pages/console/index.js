import { consoleForm } from './ConsoleForm.js';
import AbstractWebSocket from '../../AbstractWebSocket.js';
import * as connect from '../../connect.js';

class DataWebSocket extends AbstractWebSocket {
  static PORT = 9443;
  async connect() {
    await super.connect(`${connect.ws()}:${DataWebSocket.PORT}`);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
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

export const dataWebSocket = new DataWebSocket();
export const gameWebSocket = new GameWebSocket();

try {
  await Promise.all([
    dataWebSocket.connect(),
    gameWebSocket.connect()
  ]);
} catch {}
