import Modal from 'bootstrap/js/dist/modal.js';
import BaseComponent from '../BaseComponent.js';

export class UploadModal extends BaseComponent {
  mount() {
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      // TODO
    });
  }
}

export const uploadModal = new UploadModal(
  document.getElementById('uploadModal'),
  {
    modal: new Modal(document.getElementById('uploadModal'))
  }
);
