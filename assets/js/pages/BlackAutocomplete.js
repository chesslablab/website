import BaseComponent from '../BaseComponent.js';
import { dataWebSocket } from '../websockets/data/DataWebSocket.js';

export class BlackAutocomplete extends BaseComponent {
  mount() {
    this.el.addEventListener('keyup', async (event) => {
      event.preventDefault();
      if (event.target.value.length % 3 === 0) {
        this.props.submitButton.classList.add('d-none');
        this.props.loadingButton.classList.remove('d-none');
        dataWebSocket
          .send('/autocomplete_black', {
            Black: event.target.value
          })
          .onChange('/autocomplete_black', data => {
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
            this.props.submitButton.classList.remove('d-none');
            this.props.loadingButton.classList.add('d-none');
          });
      }
    });
  }
}

export const blackAutocomplete = new BlackAutocomplete({
  el: document.querySelector('input[list="blackAutocompleteList"]'),
  props() {
    return({
      datalist: document.querySelector('datalist#blackAutocompleteList'),
      submitButton: document.querySelector('button.autocomplete[type="submit"]'),
      loadingButton: document.querySelector('button.autocomplete[type="button"]')
    });
  }
});
