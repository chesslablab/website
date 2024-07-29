import * as env from '../env.js';

export default class AbstractHost {
  apiHost() {
    return env.API_HOSTS[Math.floor(Math.random() * env.API_HOSTS.length)];
  }

  websocketHost() {
    return env.WEBSOCKET_HOSTS[Math.floor(Math.random() * env.WEBSOCKET_HOSTS.length)];
  }
}
