function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}`;
  return fetch(URL).then(response => response.json());
}

export default fetchCountries;
