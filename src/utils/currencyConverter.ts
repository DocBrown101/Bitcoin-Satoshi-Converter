const SATS_PER_BTC = 100_000_000;

export const convertEuroToSats = (euro: number | string, btcPrice: number): string => {
  return ((Number(euro) / btcPrice) * SATS_PER_BTC).toFixed(0);
};

export const convertEuroToBtc = (euro: number | string, btcPrice: number): number => {
  return parseFloat((Number(euro) / btcPrice).toFixed(8));
};

export const convertBtcToSats = (btc: number | string): string => {
  return (Number(btc) * SATS_PER_BTC).toFixed(0);
};

export const convertBtcToEuro = (btc: number | string, btcPrice: number): string => {
  return (Number(btc) * btcPrice).toFixed(2);
};

export const convertSatsToBtc = (sats: number | string): number => {
  return parseFloat((Number(sats) / SATS_PER_BTC).toFixed(8));
};

export const convertSatsToEuro = (sats: number | string, btcPrice: number): string => {
  return ((Number(sats) * btcPrice) / SATS_PER_BTC).toFixed(2);
};

export const calculateOneFiatSats = (btcPrice: number): string => {
  return ((1 / btcPrice) * SATS_PER_BTC).toFixed(0);
};
