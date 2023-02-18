function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}`;
  return fetch(URL).then(response=>{
    if(response.ok){
      return response.json();
    }
    throw new Error("Oops, there is no country with this name");
  });
}

export default fetchCountries;
