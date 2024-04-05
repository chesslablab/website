import EventAutocomplete from '../components/EventAutocomplete.js';

const eventAutocomplete = new EventAutocomplete(
  document.querySelector('input[list="eventAutocompleteList"]'),
  {
    datalist: document.getElementById('eventAutocompleteList'),
    submitButton: document.querySelector('button.autocomplete[type="submit"]'),
    loadingButton: document.querySelector('button.autocomplete[type="button"]')
  }
);

export default eventAutocomplete;
