import AbstractWebSocket from '../AbstractWebSocket.js';
import * as connect from '../../../connect.js';

export class DataWebSocket extends AbstractWebSocket {
  connect() {
    return new Promise((resolve, reject) => {
      this._socket = new WebSocket(connect.wsData());

      this._socket.onopen = () => {
        resolve();
      };

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

      this._socket.onclose = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };

      this._socket.onerror = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };
    });
  }
}

export const dataWebSocket = new DataWebSocket();
