import messagesEs from './translations/messages.es.js';
import messagesFr from './translations/messages.fr.js';
import messagesTr from './translations/messages.tr.js';
import messagesDe from './translations/messages.de.js';

export const trans = (string) => {
  if (document.documentElement.lang === 'es') {
    return messagesEs[string];
  } else if (document.documentElement.lang === 'fr') {
    return messagesFr[string];
  } else if (document.documentElement.lang === 'tr') {
    return messagesTr[string];
  } else if (document.documentElement.lang === 'de') {
    return messagesDe[string];
  }

  return string;
}
