import AbstractWebSocket from '../../AbstractWebSocket.js';
import * as connect from '../../../connect.js';

export class DataWebSocket extends AbstractWebSocket {
  async connect() {
    await super.connect(connect.wsData());

    this._socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this._response[msg] = data[msg];
      switch (msg) {
        case 'error':
          console.log('Whoops! Something went wrong.');
          break;

        default:
          break;
      }
    };
  }
}

export const dataWebSocket = new DataWebSocket();
