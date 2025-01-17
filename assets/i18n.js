import messagesDe from './translations/messages.de.js';
import messagesEs from './translations/messages.es.js';
import messagesFr from './translations/messages.fr.js';
import messagesHi from './translations/messages.hi.js';
import messagesRu from './translations/messages.ru.js';
import messagesTr from './translations/messages.tr.js';
import messagesZhCN from './translations/messages.zh_CN.js';

export const messages = {
  'de': messagesDe,
  'es': messagesEs,
  'fr': messagesFr,
  'hi': messagesHi,
  'ru': messagesRu,
  'tr': messagesTr,
  'zh_CN': messagesZhCN
};

export const trans = (string) => {
  if (messages.hasOwnProperty(document.documentElement.lang)) {
    return messages[document.documentElement.lang][string];
  }

  return string;
}
