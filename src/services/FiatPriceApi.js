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
            ID: 10,
            EUR: data.EUR,
            USD: data.USD,
            API: "CryptoCompare",
          };
          return priceObject;
        })
      );
  } else if (id === 20) {
    return () =>
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd"
      ).then((response) =>
        response.json().then((data) => {
          const priceObject = {
            ID: 20,
            EUR: data.bitcoin.eur,
            USD: data.bitcoin.usd,
            API: "CoinGecko",
          };
          return priceObject;
        })
      );
  } else {
    return () =>
      fetch("https://api.kraken.com/0/public/Ticker?pair=BTCEUR,BTCUSD").then(
        (response) =>
          response.json().then((data) => {
            const priceObject = {
              ID: 30,
              EUR: parseFloat(data.result.XXBTZEUR.a[0]),
              USD: parseFloat(data.result.XXBTZUSD.a[0]),
              API: "Kraken",
            };
            return priceObject;
          })
      );
  }
}
