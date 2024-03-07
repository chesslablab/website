import {
  databaseAnnotatedGames,
  ravMovesTable
} from '../../../js/base/rav/init.js';
import * as env from '../../../env.js';

ravMovesTable.domElem();

await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/annotations/games`, {
  method: 'GET',
  headers: {
    'X-Api-Key': `${env.API_KEY}`
  }
})
.then(res => res.json())
.then(res => {
  databaseAnnotatedGames.modal.show();
  console.log(res);
  // TODO
});
