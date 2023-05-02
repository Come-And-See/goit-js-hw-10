import './css/styles.css';
import API from './js/fetchCountries';
import { Notify } from 'notiflix';

import countrysFunction from './templates/countrys.hbs';
import countrysFunctionFull from './templates/countrysFull.hbs';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onTEST, DEBOUNCE_DELAY));

function onTEST(e) {
  if (e.target.value.trim().length === 0) {
    onClearHTML();
    return;
  }

  API.fetchCountries(`${e.target.value.trim()}`).then(country => {
    if (country.status === 404) {
      onErrorCountry();
      return;
    } else if (country.length > 10) {
      onAlert();
      return;
    } else if (country.length !== 1) {
      onCountryAll(country);
      return;
    }
    onCountryOne(country);
  });
}

function onAlert() {
  Notify.info('Too many matches found. Please enter a more specific name.');
  onClearHTML();
}

function onCountryAll(country) {
  const CountryAll = countrysFunction(country);
  refs.countryInfo.innerHTML = CountryAll;
}

function onCountryOne(country) {
  const CountryOne = countrysFunctionFull(country);
  refs.countryInfo.innerHTML = CountryOne;
}

function onClearHTML() {
  refs.countryInfo.innerHTML = '';
}

function onErrorCountry() {
  Notify.failure('Oops, there is no country with that name');
  onClearHTML();
}
