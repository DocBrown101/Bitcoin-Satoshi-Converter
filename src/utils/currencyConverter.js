const SATS_PER_BTC = 100_000_000;

export const convertEuroToSats = (euro, btcPrice) => {
  return ((euro / btcPrice) * SATS_PER_BTC).toFixed(0);
};

export const convertEuroToBtc = (euro, btcPrice) => {
  return parseFloat((euro / btcPrice).toFixed(8));
};

export const convertBtcToSats = (btc) => {
  return (btc * SATS_PER_BTC).toFixed(0);
};

export const convertBtcToEuro = (btc, btcPrice) => {
  return (btc * btcPrice).toFixed(2);
};

export const convertSatsToBtc = (sats) => {
  return parseFloat((sats / SATS_PER_BTC).toFixed(8));
};

export const convertSatsToEuro = (sats, btcPrice) => {
  return ((sats * btcPrice) / SATS_PER_BTC).toFixed(2);
};

export const calculateOneFiatSats = (btcPrice) => {
  return ((1 / btcPrice) * SATS_PER_BTC).toFixed(0);
};
