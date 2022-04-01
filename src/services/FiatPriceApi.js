import { readLocalStorage } from "./LocalStorage";

export function fetchFiatPrice() {
  const id = readLocalStorage("api-ID", 10);
  console.log(id);

  if (id === 10) {
    return () =>
      fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR,USD"
      ).then((response) =>
        response.json().then((data) => {
          const priceObject = {
            EUR: data.EUR,
            USD: data.USD,
            API: "cryptocompare.com",
          };
          return priceObject;
        })
      );
  } else {
    return () =>
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd"
      ).then((response) =>
        response.json().then((data) => {
          const priceObject = {
            EUR: data.bitcoin.eur,
            USD: data.bitcoin.usd,
            API: "coingecko.com",
          };
          return priceObject;
        })
      );
  }
}
