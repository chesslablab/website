import { OpeningTable } from '@chesslablab/js-utils';
import sanMovesBrowser from './sanMovesBrowser.js';

const openingTable = new OpeningTable(
  document.querySelector('#openingTable tbody'),
  {
    movetext: sanMovesBrowser.props.movetext
  }
);

export default openingTable;
