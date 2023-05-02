const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}`).then(r => {
    return r.json();
  })
}

export default { fetchCountries };
