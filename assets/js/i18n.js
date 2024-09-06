import messagesDe from './translations/messages.de.js';
import messagesEs from './translations/messages.es.js';
import messagesFr from './translations/messages.fr.js';
import messagesHi from './translations/messages.hi.js';
import messagesTr from './translations/messages.tr.js';
import messagesZhCN from './translations/messages.zh_CN.js';

export const trans = (string) => {
  if (document.documentElement.lang === 'de') {
    return messagesDe[string];
  } else if (document.documentElement.lang === 'es') {
    return messagesEs[string];
  } else if (document.documentElement.lang === 'fr') {
    return messagesFr[string];
  } else if (document.documentElement.lang === 'hi') {
    return messagesHi[string];
  } else if (document.documentElement.lang === 'tr') {
    return messagesTr[string];
  } else if (document.documentElement.lang === 'zh_CN') {
    return messagesZhCN[string];
  }

  return string;
}
