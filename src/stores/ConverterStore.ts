import {create} from 'zustand';
import type {NumberFormatValues, SourceInfo} from 'react-number-format';
import {convertEuroToSats, convertBtcToSats, convertSatsToBtc, convertSatsToEuro, calculateOneFiatSats, isSafeAmount} from '../utils/currencyConverter.ts';

const INITIAL_SIM_PRICE = 85_000;
type Currency = 'EUR' | 'BTC' | 'sat';

const convertAmount = (amount: string, inputCurrency: Currency, price: number) => {
  const sats = inputCurrency === 'EUR' ? convertEuroToSats(amount, price)
    : inputCurrency === 'BTC' ? convertBtcToSats(amount) : amount;
  return {
    inputCurrency,
    convertedEuro: inputCurrency === 'EUR' ? amount : convertSatsToEuro(sats, price),
    convertedBitcoin: inputCurrency === 'BTC' ? amount : convertSatsToBtc(sats),
    convertedSatoshi: sats
  };
};

interface ConverterState {
  eurFiatPrice: number;
  oneFiatSats: string;
  inputCurrency: Currency;
  convertedBitcoin: string;
  convertedSatoshi: string;
  convertedEuro: string;

  simSats: string;
  simFiatPrice: string;
  simSliderPrice: number;
  simOneFiatSats: string;
  simPriceInitialized: boolean;

  setEurFiatPrice: (eurFiatPrice: number) => void;
  onEuroInputChange: (values: NumberFormatValues, sourceInfo: SourceInfo) => void;
  onBitcoinInputChange: (values: NumberFormatValues, sourceInfo: SourceInfo) => void;
  onSatoshiInputChange: (values: NumberFormatValues, sourceInfo: SourceInfo) => void;
  resetConvertedState: () => void;
  onSimFiatPriceChange: (euroAmount: string) => void;
  onSimBtcPriceChange: (btcPrice: number) => void;
}

const useStore = create<ConverterState>((set) => ({
  eurFiatPrice: 0,
  oneFiatSats: '0',
  inputCurrency: 'EUR',
  convertedBitcoin: '',
  convertedSatoshi: '',
  convertedEuro: '',

  simSats: convertEuroToSats(10, INITIAL_SIM_PRICE),
  simFiatPrice: '10',
  simSliderPrice: INITIAL_SIM_PRICE,
  simOneFiatSats: calculateOneFiatSats(INITIAL_SIM_PRICE),
  simPriceInitialized: false,

  setEurFiatPrice: (eurFiatPrice) => {
    eurFiatPrice = Number.isFinite(eurFiatPrice) && eurFiatPrice > 0 ? eurFiatPrice : 0;
    set((state) => {
      const amount = state.inputCurrency === 'EUR' ? state.convertedEuro : state.inputCurrency === 'BTC' ? state.convertedBitcoin : state.convertedSatoshi;
      const shouldUpdateSimPrice = !state.simPriceInitialized && eurFiatPrice > 0;

      return {
        ...convertAmount(amount, state.inputCurrency, eurFiatPrice),
        eurFiatPrice,
        oneFiatSats: calculateOneFiatSats(eurFiatPrice),
        ...(shouldUpdateSimPrice && {
          simPriceInitialized: true,
          simSliderPrice: eurFiatPrice,
          simSats: convertEuroToSats(state.simFiatPrice, eurFiatPrice),
          simOneFiatSats: calculateOneFiatSats(eurFiatPrice)
        })
      };
    });
  },

  onEuroInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') return;

    set((state) => convertAmount(values.value, 'EUR', state.eurFiatPrice));
  },

  onBitcoinInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') return;

    set((state) => convertAmount(values.value, 'BTC', state.eurFiatPrice));
  },

  onSatoshiInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') return;

    set((state) => convertAmount(values.value, 'sat', state.eurFiatPrice));
  },

  resetConvertedState: () => {
    set({
      convertedBitcoin: '',
      convertedSatoshi: '',
      convertedEuro: ''
    });
  },

  onSimFiatPriceChange: (euroAmount) => {
    const fiatAmount = isSafeAmount(euroAmount, 2) ? euroAmount : '';
    set((state) => ({
      simFiatPrice: fiatAmount,
      simSats: convertEuroToSats(fiatAmount, state.simSliderPrice)
    }));
  },

  onSimBtcPriceChange: (btcPrice) => {
    btcPrice = Number.isFinite(btcPrice) && btcPrice >= 0 ? btcPrice : 0;
    set((state) => ({
      simPriceInitialized: true,
      simSliderPrice: btcPrice,
      simSats: convertEuroToSats(state.simFiatPrice, btcPrice),
      simOneFiatSats: calculateOneFiatSats(btcPrice)
    }));
  }
}));

export default useStore;
