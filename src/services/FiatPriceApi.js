import {readLocalStorage} from './LocalStorage';

export function fetchEUR() {
  const id = readLocalStorage("api-ID", 10);
  console.log(id);
  return () => fetchFiatPrice("EUR");
}

function fetchFiatPrice(tsyms) {
  const id = readLocalStorage("api-ID", 10);
  console.log(id);
  return () => fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=" + tsyms).then(res => res.json());
}