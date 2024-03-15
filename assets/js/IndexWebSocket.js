import { jwtDecode } from 'jwt-decode';
import onlinePlayersTable from './layout/index/onlinePlayersTable.js';
import * as env from '../env.js';

export default class IndexWebSocket {
  constructor() {
    this.socket = null;
  }

  connect() {
    console.log('Establishing connection...');

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`${env.WEBSOCKET_SCHEME}://${env.WEBSOCKET_HOST}:${env.WEBSOCKET_PORT}`);

      this.socket.onopen = () => {
        console.log('Opened connection!');
        resolve();
      };

      this.socket.onmessage = (res) => {
        const data = JSON.parse(res.data);
        const msg = Object.keys(data)[0];
        switch (true) {
          case 'error' === msg:
            if (data['error']) {
              console.log('Whoops! Something went wrong.');
            }
            break;

          case '/online_games' === msg:
            if (data['/online_games']) {
              onlinePlayersTable.domElem(data['/online_games']);
            }
            break;

          case '/accept' === msg:
            if (data['/accept'].jwt) {
              const jwtDecoded = jwtDecode(data['/accept'].jwt);
              const turn = jwtDecoded.fen.split(' ')[1];
              if (!localStorage.getItem('color')) {
                jwtDecoded.color === COLOR.white
                  ? chessboard.setOrientation(COLOR.black)
                  : chessboard.setOrientation(COLOR.white);
                localStorage.setItem(
                  'color',
                  localStorage.getItem('color') === COLOR.black ? COLOR.white : COLOR.black
                );
              }
              localStorage.setItem('hash', data['/accept'].hash);
            }
            break;

          default:
            break;
        }
      };

      this.socket.onclose = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };

      this.socket.onerror = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };
    });
  }

  send(msg) {
    if (this.socket) {
      this.socket.send(msg);
    }
  }
}
