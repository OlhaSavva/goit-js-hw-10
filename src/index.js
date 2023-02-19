import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();
  const inputValue = event.target.value.trim();
  if (inputValue === '') {
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';

      if (countries.length === 1) {
        console.log(countries);

        const markup = createMarkupForCountryInfo(countries[0]);
        refs.countryInfo.innerHTML = markup;
      } else if (countries.length > 1 && countries.length <= 10) {
        console.log(countries);
        const markup = createMarkupForCountryList(countries);
        refs.countryList.innerHTML = markup;
      } else {
        Notify.info(
          'Too many matches found. Please enter a more specific query!'
        );
      }
    })
    .catch(error => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';

      Notify.failure(error.message);
    });
}

function createMarkupForCountryInfo(country) {
  const languages = Object.values(country.languages);
  const languagesStr =
    languages.length > 1 ? languages.join(', ') : languages[0];
  return `
    <li class="country">
    <div class="country_item">
      <img src="${country.flags.svg}" alt="${country.flags.alt}" class="flags">
      <span class="country__name">${country.name.official}</span>
      </div>
      <p class="country__capital"><strong>Capital: </strong>${country.capital}</p>
      <p class="country__population"><strong>Population: </strong>${country.population}</p>
      <p class="country__languages"><strong>Languages: </strong>${languagesStr}</p>
    </li>
  `;
}

function createMarkupForCountryList(countries) {
  return countries.map(country => countryListMarkup(country)).join('');
}

function countryListMarkup(country) {
  return `
  <div class="country_list">
    <img src="${country.flags.svg}" alt="${country.flags.svg}" class="flags">
      <span class="country__name-list">${country.name.official}</span>
      <div>
  `;
}
