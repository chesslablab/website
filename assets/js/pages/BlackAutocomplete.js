import AbstractComponent from '../AbstractComponent.js';
import { dataWebSocket } from '../websockets/data/DataWebSocket.js';
import * as connect from '../../connect.js';
import * as env from '../../env.js';

export class BlackAutocomplete extends AbstractComponent {
  mount() {
    this.el.addEventListener('keyup', async (event) => {
      try {
        event.preventDefault();
        if (event.target.value.length % 3 === 0) {
          this.props.submitButton.classList.add('d-none');
          this.props.loadingButton.classList.remove('d-none');
          const settings = {
            Black: event.target.value
          };
          await dataWebSocket.connect();
          dataWebSocket.send(`/autocomplete_player "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
          dataWebSocket.watch('/autocomplete_player', (newValue, oldValue) => {
            this.props.datalist.replaceChildren();
            newValue.forEach(item => {
              const option = document.createElement('option');
              option.appendChild(document.createTextNode(item));
              option.addEventListener('click', (event) => {
                event.preventDefault();
                this.el.value = item;
              });
              this.props.datalist.append(option);
            });
          });
        }
      } catch (error) {
      } finally {
        this.props.submitButton.classList.remove('d-none');
        this.props.loadingButton.classList.add('d-none');
      }
    });
  }
}

export const blackAutocomplete = new BlackAutocomplete(
  document.querySelector('input[list="blackAutocompleteList"]'),
  {
    datalist: document.getElementById('blackAutocompleteList'),
    submitButton: document.querySelector('button.autocomplete[type="submit"]'),
    loadingButton: document.querySelector('button.autocomplete[type="button"]')
  }
);
