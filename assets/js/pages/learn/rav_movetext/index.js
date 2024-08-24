import { ravMovetextModal } from './RavMovetextModal.js';
import { annotationsWebSocket } from '../../../websockets/game/AnnotationsWebSocket.js';

sessionStorage.clear();

try {
  await annotationsWebSocket.connect();
} catch {}

ravMovetextModal.props.modal.show();
