import { OpeningTable } from '@chesslablab/jsblab';
import sanMovesTable from './sanMovesTable.js';

const openingTable = new OpeningTable(
  document.querySelector('#openingTable tbody'),
  {
    movetext: sanMovesTable.props.movetext
  }
);

export default openingTable;
