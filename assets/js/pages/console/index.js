import { consoleForm } from './ConsoleForm.js';
import AbstractWebSocket from '../../AbstractWebSocket.js';
import * as connect from '../../connect.js';

class ConsoleWebSocket extends AbstractWebSocket {
  async connect(port) {
    await super.connect(`${connect.ws()}:${port}`);
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

export const dataWebSocket = new ConsoleWebSocket();
export const gameWebSocket = new ConsoleWebSocket();
export const binaryWebSocket = new ConsoleWebSocket();
export const authWebSocket = new ConsoleWebSocket();

try {
  await Promise.all([
    dataWebSocket.connect(9443),
    gameWebSocket.connect(8443),
    binaryWebSocket.connect(7443),
    authWebSocket.connect(6443)
  ]);
} catch {}

consoleForm.props.command.focus();
