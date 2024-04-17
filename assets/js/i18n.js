import messagesEs from './translations/messages.es.js';
import messagesFr from './translations/messages.fr.js';

export const trans = (string) => {
  if (document.documentElement.lang === 'es') {
    return messagesEs[string];
  } else if (document.documentElement.lang === 'fr') {
    return messagesFr[string];
  }

  return string;
}
