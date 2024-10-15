import { ravMovetextModal } from './RavMovetextModal.js';
import { annotationsWebSocket } from '../../../websockets/game/AnnotationsWebSocket.js';

sessionStorage.clear();

try {
  await Promise.all([
  	annotationsWebSocket.connect()
  ]);
} catch {}

ravMovetextModal.props.modal.show();
