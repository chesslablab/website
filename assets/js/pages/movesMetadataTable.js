import { MovesMetadataTable } from '@chesslablab/js-utils';

const movesMetadataTable = new MovesMetadataTable({
  el: document.querySelector('#movesMetadataTable tbody'),
  props() {
    return({});
  }
});

export default movesMetadataTable;
