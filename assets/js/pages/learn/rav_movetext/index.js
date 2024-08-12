import { ravMovetextModal } from './RavMovetextModal.js';
import { annotationsWebSocket } from '../../../websockets/game/AnnotationsWebSocket.js';

sessionStorage.clear();

await annotationsWebSocket.connect();

ravMovetextModal.props.modal.show();
