import messagesEs from './translations/messages.es.js';
import messagesFr from './translations/messages.fr.js';
import messagesTr from './translations/messages.tr.js';

export const trans = (string) => {
  if (document.documentElement.lang === 'es') {
    return messagesEs[string];
  } else if (document.documentElement.lang === 'fr') {
    return messagesFr[string];
  } else if (document.documentElement.lang === 'tr') {
    return messagesTr[string];
  }

  return string;
}
