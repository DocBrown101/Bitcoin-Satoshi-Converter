const SATS_PER_BTC = 100_000_000;

const parseUnits = (amount: number | string, precision: number): number | undefined => {
  const text = typeof amount === 'number' ? amount.toFixed(precision) : amount;
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return;
  const [whole, fraction = ''] = text.split('.');
  if (fraction.length > precision) return;
  const units = Number(whole + fraction.padEnd(precision, '0'));
  return Number.isSafeInteger(units) ? units : undefined;
};

export const isSafeAmount = (amount: number | string, precision: number): boolean => {
  return parseUnits(amount, precision) !== undefined;
};

const convertUnits = (units: number | undefined, factor: number): number | undefined => {
  if (units === undefined || units < 0 || units > Number.MAX_SAFE_INTEGER || !Number.isFinite(factor) || factor <= 0) return;
  const result = Math.round(units * factor);
  return Number.isSafeInteger(result) ? result : undefined;
};

const formatUnits = (units: number | undefined, precision: number): string => {
  if (units === undefined) return '';
  const digits = String(units).padStart(precision + 1, '0');
  return precision ? `${digits.slice(0, -precision)}.${digits.slice(-precision)}` : digits;
};

export const convertEuroToSats = (euro: number | string, btcPrice: number): string => {
  return formatUnits(convertUnits(parseUnits(euro, 2), SATS_PER_BTC / 100 / btcPrice), 0);
};

export const convertEuroToBtc = (euro: number | string, btcPrice: number): string => {
  return convertSatsToBtc(convertEuroToSats(euro, btcPrice));
};

export const convertBtcToSats = (btc: number | string): string => {
  return formatUnits(parseUnits(btc, 8), 0);
};

export const convertBtcToEuro = (btc: number | string, btcPrice: number): string => {
  return convertSatsToEuro(convertBtcToSats(btc), btcPrice);
};

export const convertSatsToBtc = (sats: number | string): string => {
  return formatUnits(parseUnits(sats, 0), 8);
};

export const convertSatsToEuro = (sats: number | string, btcPrice: number): string => {
  // Numeric fee estimates can include fractional satoshis; round only the final cents.
  const units = typeof sats === 'number' ? sats : parseUnits(sats, 0);
  return formatUnits(convertUnits(units, btcPrice * 100 / SATS_PER_BTC), 2);
};

export const calculateOneFiatSats = (btcPrice: number): string => {
  return convertEuroToSats(1, btcPrice);
};
