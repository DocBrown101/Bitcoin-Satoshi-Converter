export interface FiatPriceData {
  ID: number;
  EUR: number;
  USD: number;
  API: string;
}

const providers: Record<number, {name: string; url: string}> = {
  20: {name: 'CoinGecko', url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd'},
  30: {name: 'Coinpaprika', url: 'https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=EUR,USD'},
  40: {name: 'Kraken', url: 'https://api.kraken.com/0/public/Ticker?pair=BTCEUR,BTCUSD'},
};

export const normalizeApiId = (id: unknown): number => {
  return typeof id === 'number' && Object.hasOwn(providers, id) ? id : 40;
};

const parsePrice = (value: unknown): number => {
  return typeof value === 'number' || (typeof value === 'string' && value.trim() !== '') ? Number(value) : NaN;
};

export async function fetchFiatPrice(apiId = 40, signal?: AbortSignal): Promise<FiatPriceData> {
  const id = normalizeApiId(apiId);
  const provider = providers[id];
  const response = await fetch(provider.url, {signal});
  if (!response.ok) throw new Error(`${provider.name}: HTTP ${response.status}`);

  const data = await response.json();
  let eur: unknown;
  let usd: unknown;
  switch (id) {
    case 20:
      eur = data?.bitcoin?.eur;
      usd = data?.bitcoin?.usd;
      break;
    case 30:
      eur = data?.quotes?.EUR?.price;
      usd = data?.quotes?.USD?.price;
      break;
    case 40:
      if (data?.error?.length) throw new Error(`${provider.name}: ${data.error.join(', ')}`);
      eur = data?.result?.XXBTZEUR?.c?.[0];
      usd = data?.result?.XXBTZUSD?.c?.[0];
      break;
  }

  const EUR = parsePrice(eur);
  const USD = parsePrice(usd);
  if (!Number.isFinite(EUR) || EUR <= 0 || !Number.isFinite(USD) || USD <= 0) {
    throw new Error(`${provider.name}: invalid price response`);
  }
  return {ID: id, EUR, USD, API: provider.name};
}
