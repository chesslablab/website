import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../PlayWebSocket.js';

export class PlayersButtons extends AbstractComponent {
  mount() {
    this.el.replaceChildren();
    if (this.props.games.length > 0) {
      this.props.games.forEach(game => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'w-100', 'rounded-0');
        button.textContent = `${game.variant.charAt(0).toUpperCase() + game.variant.slice(1)} ${game.min}+${game.increment} ${game.color}`;
        if (sessionStorage.getItem('hash') !== game.hash) {
          button.addEventListener('click', () => {
            playWebSocket.send(`/accept ${game.hash}`);
          });
        } else {
          button.disabled = true;
        }
        this.el.appendChild(button);
      });
    }
  }
}

export const playersButtons = new PlayersButtons(
  document.getElementById('playersButtons'),
  {
    games: []
  }
);
