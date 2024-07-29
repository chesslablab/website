import AbstractComponent from '../AbstractComponent.js';
import * as env from '../../env.js';

export class EventAutocomplete extends AbstractComponent {
  mount() {
    this.el.addEventListener('keyup', async (event) => {
      try {
        event.preventDefault();
        if (event.target.value.length % 3 === 0) {
          this.props.submitButton.classList.add('d-none');
          this.props.loadingButton.classList.remove('d-none');
          const res = await fetch(`${this.apiHost()}/${env.API_VERSION}/autocomplete/event`, {
            method: 'POST',
            body: JSON.stringify({
              Event: event.target.value
            })
          });
          this.props.datalist.replaceChildren();
          (await res.json()).forEach(item => {
            const option = document.createElement('option');
            option.appendChild(document.createTextNode(item));
            option.addEventListener('click', (event) => {
              event.preventDefault();
              this.el.value = item;
            });
            this.props.datalist.append(option);
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

export const eventAutocomplete = new EventAutocomplete(
  document.querySelector('input[list="eventAutocompleteList"]'),
  {
    datalist: document.getElementById('eventAutocompleteList'),
    submitButton: document.querySelector('button.autocomplete[type="submit"]'),
    loadingButton: document.querySelector('button.autocomplete[type="button"]')
  }
);
