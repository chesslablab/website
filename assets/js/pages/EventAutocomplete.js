import AbstractComponent from '../AbstractComponent.js';
import { dataWebSocket } from '../websockets/data/DataWebSocket.js';

export class EventAutocomplete extends AbstractComponent {
  mount() {
    this.el.addEventListener('keyup', async (event) => {
      event.preventDefault();
      if (event.target.value.length % 3 === 0) {
        this.props.submitButton.classList.add('d-none');
        this.props.loadingButton.classList.remove('d-none');
        const settings = {
          Event: event.target.value
        };
        await dataWebSocket.connect();
        dataWebSocket.send(`/autocomplete_event "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
        dataWebSocket.watch('/autocomplete_event', (data) => {
          this.props.datalist.replaceChildren();
          data.forEach(item => {
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
      this.props.submitButton.classList.remove('d-none');
      this.props.loadingButton.classList.add('d-none');
    });
  }
}

export const eventAutocomplete = new EventAutocomplete(
  document.querySelector('input[list="eventAutocompleteList"]'),
  {
    datalist: document.getElementById('eventAutocompleteList'),
    submitButton: document.querySelector('button.autocomplete[type="submit"]'),
    loadingButton: document.querySelector('button.autocomplete[type="button"]')
  }
);
