import {create} from 'zustand';
import {convertEuroToSats, convertEuroToBtc, convertBtcToSats, convertBtcToEuro, convertSatsToBtc, convertSatsToEuro, calculateOneFiatSats} from '../utils/currencyConverter';

const useStore = create((set) => ({
  eurFiatPrice: 0,
  oneFiatSats: 0,
  convertedBitcoin: '',
  convertedSatoshi: '',
  convertedEuro: '',

  setEurFiatPrice: (eurFiatPrice) => {
    set({
      eurFiatPrice,
      oneFiatSats: calculateOneFiatSats(eurFiatPrice)
    });
  },

  onEuroInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') return;

    const {value: euroAmount} = values;
    set((state) => ({
      convertedBitcoin: convertEuroToBtc(euroAmount, state.eurFiatPrice),
      convertedSatoshi: convertEuroToSats(euroAmount, state.eurFiatPrice),
      convertedEuro: euroAmount
    }));
  },

  onBitcoinInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') return;

    const {value: btcAmount} = values;
    set((state) => ({
      convertedBitcoin: btcAmount,
      convertedSatoshi: convertBtcToSats(btcAmount),
      convertedEuro: convertBtcToEuro(btcAmount, state.eurFiatPrice)
    }));
  },

  onSatoshiInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') return;

    const {value: satsAmount} = values;
    set((state) => ({
      convertedBitcoin: convertSatsToBtc(satsAmount),
      convertedSatoshi: satsAmount,
      convertedEuro: convertSatsToEuro(satsAmount, state.eurFiatPrice)
    }));
  },

  resetConvertedState: () => {
    set({
      convertedBitcoin: '',
      convertedSatoshi: '',
      convertedEuro: ''
    });
  }
}));

export default useStore;
