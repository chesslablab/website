import AbstractGameWebSocket from './AbstractGameWebSocket.js';
import * as connect from '../../../connect.js';

export class AnnotationsWebSocket extends AbstractGameWebSocket {
  async connect() {
    await super.connect(connect.wsGame());

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

export const annotationsWebSocket = new AnnotationsWebSocket();
