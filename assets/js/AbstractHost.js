import * as env from '../env.js';

export default class AbstractHost {
  apiEndpoint() {
    return env.API_ENDPOINTS[Math.floor(Math.random() * env.API_ENDPOINTS.length)];
  }

  websocketHost() {
    return env.WEBSOCKET_HOSTS[Math.floor(Math.random() * env.WEBSOCKET_HOSTS.length)];
  }
}
