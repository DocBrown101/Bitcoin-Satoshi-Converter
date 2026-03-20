import {readLocalStorage} from "./LocalStorage";

export interface FiatPriceData {
  ID: number;
  EUR: number;
  USD: number;
  API: string;
}

export function fetchFiatPrice(): Promise<FiatPriceData> {
  const id = readLocalStorage<number>("api-ID", 10);
  console.log(id);

  if (id === 10) {
    return fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR,USD"
    ).then((response) =>
      response.json().then((data: { EUR: number; USD: number }) => ({
        ID: 10,
        EUR: data.EUR,
        USD: data.USD,
        API: "CryptoCompare",
      }))
    );
  } else if (id === 20) {
    return fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd"
    ).then((response) =>
      response.json().then((data: { bitcoin: { eur: number; usd: number } }) => ({
        ID: 20,
        EUR: data.bitcoin.eur,
        USD: data.bitcoin.usd,
        API: "CoinGecko",
      }))
    );
  } else if (id === 30) {
    return fetch(
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=EUR,USD"
    ).then((response) =>
      response.json().then((data: { quotes: { EUR: { price: string }; USD: { price: string } } }) => ({
        ID: 30,
        EUR: Number.parseFloat(data.quotes.EUR.price),
        USD: Number.parseFloat(data.quotes.USD.price),
        API: "coinpaprika",
      }))
    );
  } else {
    return fetch("https://api.kraken.com/0/public/Ticker?pair=BTCEUR,BTCUSD").then(
      (response) =>
        response.json().then((data: { result: { XXBTZEUR: { a: string[] }; XXBTZUSD: { a: string[] } } }) => ({
          ID: 40,
          EUR: Number.parseFloat(data.result.XXBTZEUR.a[0]),
          USD: Number.parseFloat(data.result.XXBTZUSD.a[0]),
          API: "Kraken",
        }))
    );
  }
}
