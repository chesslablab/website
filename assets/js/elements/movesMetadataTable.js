import { MovesMetadataTable } from '@chesslablab/jsblab';

const movesMetadataTable = new MovesMetadataTable(
  document.querySelector('#movesMetadataTable tbody'),
  {}
);

export default movesMetadataTable;
