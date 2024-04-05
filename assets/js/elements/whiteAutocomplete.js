import WhiteAutocomplete from '../components/WhiteAutocomplete.js';

const whiteAutocomplete = new WhiteAutocomplete(
  document.querySelector('input[list="whiteAutocompleteList"]'),
  {
    datalist: document.getElementById('whiteAutocompleteList'),
    submitButton: document.querySelector('button.autocomplete[type="submit"]'),
    loadingButton: document.querySelector('button.autocomplete[type="button"]')
  }
);

export default whiteAutocomplete;
