const API_ENDPOINTS = [
  'https://api.chesslablab.org:9443/v1'
];

const WEBSOCKET_HOSTS = [
  'wss://async.chesslablab.org:8443'
];

const apiEndpoint = () => {
  if (localStorage.getItem('api')) {
    if (localStorage.getItem('api') !== 'random') {
      return localStorage.getItem('api');
    }
  }

  return API_ENDPOINTS[Math.floor(Math.random() * API_ENDPOINTS.length)];
}

const websocketHost = () => {
  if (localStorage.getItem('ws')) {
    if (localStorage.getItem('ws') !== 'random') {
      return localStorage.getItem('ws');
    }
  }

  return WEBSOCKET_HOSTS[Math.floor(Math.random() * WEBSOCKET_HOSTS.length)];
}

export {
  API_ENDPOINTS,
  WEBSOCKET_HOSTS,
  apiEndpoint,
  websocketHost
};
