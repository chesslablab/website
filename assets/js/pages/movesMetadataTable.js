import { MovesMetadataTable } from '@chesslablab/js-utils';

const movesMetadataTable = new MovesMetadataTable(
  document.querySelector('#movesMetadataTable tbody'),
  {}
);

export default movesMetadataTable;
