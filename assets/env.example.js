const API_ENDPOINTS = [
  'https://api.chesslablab.org:9443/v1'
];

const WEBSOCKET_HOSTS = [
  'wss://async.chesslablab.org:8443'
];

const apiEndpoint = () => {
  return API_ENDPOINTS[Math.floor(Math.random() * API_ENDPOINTS.length)];
}

const websocketHost = () => {
  return WEBSOCKET_HOSTS[Math.floor(Math.random() * WEBSOCKET_HOSTS.length)];
}

export {
  API_ENDPOINTS,
  WEBSOCKET_HOSTS,
  apiEndpoint,
  websocketHost
};
