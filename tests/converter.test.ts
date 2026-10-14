import assert from 'node:assert/strict';
import {beforeEach, test} from 'node:test';
import type {SourceInfo} from 'react-number-format';
import useStore from '../src/stores/ConverterStore.ts';
import * as converter from '../src/utils/currencyConverter.ts';

const eventSource = {source: 'event'} as SourceInfo;
const propSource = {source: 'prop'} as SourceInfo;
const values = (value: string) => ({value, formattedValue: value, floatValue: value === '' ? undefined : Number(value)});
beforeEach(() => useStore.setState(useStore.getInitialState(), true));

test('converts BTC, EUR and individual satoshis with the expected precision', () => {
  assert.equal(converter.convertEuroToBtc(50, 50_000), '0.00100000');
  assert.equal(converter.convertEuroToSats(50, 50_000), '100000');
  assert.equal(converter.convertBtcToEuro('0.001', 50_000), '50.00');
  assert.equal(converter.convertBtcToSats('0.00000001'), '1');
  assert.equal(converter.convertSatsToBtc(1), '0.00000001');
  assert.equal(converter.convertSatsToEuro(100_000, 50_000), '50.00');
  assert.equal(converter.convertSatsToEuro(2.6, 500_000), '0.01');
  assert.equal(converter.calculateOneFiatSats(50_000), '2000');
});

test('euro conversions round once to whole satoshis', () => {
  useStore.getState().setEurFiatPrice(16_000);
  for (const [euro, sats, btc] of [['0.15', '938', '0.00000938'], ['0.29', '1813', '0.00001813']]) {
    useStore.getState().onEuroInputChange(values(euro), eventSource);
    assert.equal(useStore.getState().convertedSatoshi, sats);
    assert.equal(useStore.getState().convertedBitcoin, btc);
    assert.equal(converter.convertBtcToSats(btc), sats);
    assert.equal(converter.convertEuroToBtc(euro, 16_000), btc);
  }
});

test('amount limits apply to cents and satoshis without losing adjacent units', () => {
  for (const [precision, maximum, overflow] of [
    [0, '9007199254740991', '9007199254740992'],
    [2, '90071992547409.91', '90071992547409.92'],
    [8, '90071992.54740991', '90071992.54740992'],
  ] as const) {
    assert.equal(converter.isSafeAmount(maximum, precision), true);
    assert.equal(converter.isSafeAmount(overflow, precision), false);
  }
  assert.equal(converter.convertBtcToSats('90071992.54740990'), '9007199254740990');
  assert.equal(converter.convertBtcToSats('90071992.54740991'), '9007199254740991');
  assert.equal(converter.convertSatsToBtc('9007199254740991'), '90071992.54740991');
  assert.equal(converter.convertBtcToSats(0.00000001), '1');
  assert.equal(converter.convertBtcToSats('90071992.54740992'), '');
  assert.equal(converter.convertSatsToBtc('9007199254740992'), '');
  assert.equal(converter.convertEuroToSats('90071992547409.91', 1), '');
  assert.equal(converter.convertBtcToEuro(1, Number.MAX_SAFE_INTEGER), '');
  assert.equal(converter.isSafeAmount('0.001', 2), false);
  assert.equal(converter.isSafeAmount(' ', 2), false);
});

test('empty amounts and invalid prices never produce NaN or Infinity', () => {
  for (const price of [0, -1, NaN, Infinity]) {
    assert.equal(converter.convertEuroToBtc(10, price), '');
    assert.equal(converter.convertEuroToSats(10, price), '');
    assert.equal(converter.convertBtcToEuro(1, price), '');
    assert.equal(converter.convertSatsToEuro(1, price), '');
    assert.equal(converter.calculateOneFiatSats(price), '');
  }
  assert.equal(converter.convertEuroToBtc('', 50_000), '');
  assert.equal(converter.convertBtcToSats(''), '');
  assert.equal(converter.convertSatsToBtc(''), '');
  assert.equal(converter.convertBtcToSats('not a number'), '');
  assert.equal(converter.convertBtcToSats(-1), '');
});

test('price refreshes preserve the last input currency', () => {
  useStore.getState().setEurFiatPrice(50_000);
  useStore.getState().onEuroInputChange(values('50'), eventSource);
  useStore.getState().setEurFiatPrice(100_000);
  assert.equal(useStore.getState().convertedEuro, '50');
  assert.equal(useStore.getState().convertedSatoshi, '50000');
  useStore.getState().onBitcoinInputChange(values('0.001'), eventSource);
  useStore.getState().setEurFiatPrice(50_000);
  assert.equal(useStore.getState().convertedBitcoin, '0.001');
  assert.equal(useStore.getState().convertedEuro, '50.00');
  useStore.getState().onSatoshiInputChange(values('1'), eventSource);
  useStore.getState().setEurFiatPrice(100_000);
  assert.equal(useStore.getState().convertedSatoshi, '1');
  assert.equal(useStore.getState().convertedBitcoin, '0.00000001');
});

test('clearing any input clears all amounts and prop updates are ignored', () => {
  for (const handler of ['onEuroInputChange', 'onBitcoinInputChange', 'onSatoshiInputChange'] as const) {
    useStore.getState().setEurFiatPrice(50_000);
    useStore.getState()[handler](values('1'), eventSource);
    const previous = useStore.getState();
    previous[handler](values('2'), propSource);
    assert.equal(useStore.getState(), previous);
    previous[handler](values(''), eventSource);
    const state = useStore.getState();
    assert.deepEqual([state.convertedEuro, state.convertedBitcoin, state.convertedSatoshi], ['', '', '']);
  }
});

test('simulation starts consistently and tolerates empty amounts and zero prices', () => {
  assert.equal(useStore.getState().simSats, converter.convertEuroToSats(10, 85_000));
  useStore.getState().onSimFiatPriceChange('');
  assert.equal(useStore.getState().simFiatPrice, '');
  assert.equal(useStore.getState().simSats, '');
  useStore.getState().onSimFiatPriceChange('10');
  useStore.getState().onSimBtcPriceChange(0);
  assert.equal(useStore.getState().simSats, '');
  assert.equal(useStore.getState().simOneFiatSats, '');
});

test('simulation keeps decimal inputs as strings and rejects unsafe amounts', () => {
  useStore.getState().onSimFiatPriceChange('90071992547409.90');
  assert.equal(useStore.getState().simFiatPrice, '90071992547409.90');
  useStore.getState().onSimFiatPriceChange('90071992547409.92');
  assert.equal(useStore.getState().simFiatPrice, '');
  assert.equal(useStore.getState().simSats, '');
});

test('live prices initialize the simulation once and never overwrite manual choices', () => {
  useStore.getState().setEurFiatPrice(50_000);
  assert.equal(useStore.getState().simSliderPrice, 50_000);
  useStore.getState().setEurFiatPrice(60_000);
  assert.equal(useStore.getState().simSliderPrice, 50_000);
  useStore.getState().onSimBtcPriceChange(85_000);
  useStore.getState().setEurFiatPrice(70_000);
  assert.equal(useStore.getState().simSliderPrice, 85_000);
});
