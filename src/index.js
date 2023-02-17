import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();
  const inputValue = event.target.value.trim();

  fetchCountries(inputValue).then(console.log);
}
