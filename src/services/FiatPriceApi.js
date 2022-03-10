import {readLocalStorage} from './LocalStorage';

export function fetchEUR() {
  const id = readLocalStorage("api-ID", 10);
  console.log(id);
  return () => fetchFiatPrice("EUR");
}

function fetchFiatPrice(tsyms) {
  return () => fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=" + tsyms).then(res => res.json());
}