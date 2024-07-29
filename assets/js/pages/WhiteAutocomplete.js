import AbstractComponent from '../AbstractComponent.js';
import * as connect from '../../connect.js';
import * as env from '../../env.js';

export class WhiteAutocomplete extends AbstractComponent {
  mount() {
    this.el.addEventListener('keyup', async (event) => {
      try {
        event.preventDefault();
        if (event.target.value.length % 3 === 0) {
          this.props.submitButton.classList.add('d-none');
          this.props.loadingButton.classList.remove('d-none');
          const res = await fetch(`${connect.api()}/autocomplete/player`, {
            method: 'POST',
            body: JSON.stringify({
              White: event.target.value
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

export const whiteAutocomplete = new WhiteAutocomplete(
  document.querySelector('input[list="whiteAutocompleteList"]'),
  {
    datalist: document.getElementById('whiteAutocompleteList'),
    submitButton: document.querySelector('button.autocomplete[type="submit"]'),
    loadingButton: document.querySelector('button.autocomplete[type="button"]')
  }
);
