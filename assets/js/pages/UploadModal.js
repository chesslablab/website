import Modal from 'bootstrap/js/dist/modal.js';
import BaseComponent from '../BaseComponent.js';
import { analysisWebSocket } from '../websockets/game/AnalysisWebSocket.js';

export class UploadModal extends BaseComponent {
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async upload(event) {
    return await this.toBase64(event.target.files[0]);
  };

  mount() {
    this.props.chessboardInput.addEventListener('change', event => {
      event.preventDefault();
      this.upload(event).then(data => {
        analysisWebSocket
          .send('/recognizer', {
            data: data
          });
      });
    });
  }
}

export const uploadModal = new UploadModal(
  document.getElementById('uploadModal'),
  {
    modal: new Modal(document.getElementById('uploadModal')),
    chessboardInput: document.querySelector('input[name="chessboard"]')
  }
);
