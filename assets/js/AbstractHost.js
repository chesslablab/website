import * as env from '../env.js';

export default class AbstractHost {
  websocketHost() {
    return env.WEBSOCKET_HOSTS[Math.floor(Math.random() * env.WEBSOCKET_HOSTS.length)];
  }
}
