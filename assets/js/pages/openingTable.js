import { OpeningTable } from '@chesslablab/js-utils';
import sanMovesBrowser from './sanMovesBrowser.js';

const openingTable = new OpeningTable({
  el: document.querySelector('#openingTable tbody'),
  props() {
    return({
      movetext: sanMovesBrowser.props.movetext
    });
  }
});

export default openingTable;
