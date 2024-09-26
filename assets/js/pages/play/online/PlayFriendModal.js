import jsCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Modal from 'bootstrap/js/dist/modal.js';
import { copyInviteCodeModal } from './CopyInviteCodeModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

// Function to validate FEN string
function isValidFEN(fen) {
  const parts = fen.split(' ');
  if (parts.length !== 6) return false; 
  return true;
}

export class PlayFriendModal extends AbstractComponent {
  mount() {
    this.props.form.getElementsByTagName('select')[0].addEventListener('change', event => {
      event.preventDefault();
      if (event.target.value === variant.CHESS_960) {
        this.props.form.getElementsByClassName('startPos')[0].classList.remove('d-none');
      } else {
        this.props.form.getElementsByClassName('startPos')[0].classList.add('d-none');
      }
    });

    this.props.form.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(this.props.form);
      const accessToken = jsCookie.get('access_token') ? jwtDecode(jsCookie.get('access_token')) : null;

      // FEN validation
      const fen = formData.get('fen');
      if (fen && !isValidFEN(fen)) {
        alert("Invalid FEN string. Please enter a valid FEN.");
        return; // Stop form submission if FEN is invalid
      }

      playWebSocket.send('/start', {
        variant: formData.get('variant'),
        mode: mode.PLAY,
        settings: {
          min: formData.get('minutes'),
          increment: formData.get('increment'),
          color: formData.get('color'),
          submode: 'friend',
          ...(formData.get('variant') === variant.CHESS_960) && { startPos: formData.get('startPos') },
          ...(fen && { fen: fen }),  
          username: accessToken ? accessToken.username : null,
          elo: accessToken ? accessToken.elo : null
        }
      });

      this.props.modal.hide();
      this.props.copyInviteCodeModal.props.modal.show();
    });

    playWebSocket.onmessage = function(event) {
      const response = JSON.parse(event.data);
      if (response['/start'] && response['/start'].message) {
        alert(`Info: ${response['/start'].message}`);
      }
    };
  }
}

export const playFriendModal = new PlayFriendModal(
  document.getElementById('playFriendModal'),
  {
    modal: new Modal(document.getElementById('playFriendModal')),
    form: document.querySelector('#playFriendModal form'),
    copyInviteCodeModal: copyInviteCodeModal
  }
);
