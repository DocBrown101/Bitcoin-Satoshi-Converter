import {create} from 'zustand';
import {convertEuroToSats, convertEuroToBtc, convertBtcToSats, convertBtcToEuro, convertSatsToBtc, convertSatsToEuro, calculateOneFiatSats} from '../utils/currencyConverter';

const INITIAL_SIM_PRICE = 85_000;

const useStore = create((set) => ({
  eurFiatPrice: 0,
  oneFiatSats: 0,
  convertedBitcoin: '',
  convertedSatoshi: '',
  convertedEuro: '',

  simSats: 0,
  simFiatPrice: 10,
  simSliderPrice: INITIAL_SIM_PRICE,
  simOneFiatSats: calculateOneFiatSats(INITIAL_SIM_PRICE),

  setEurFiatPrice: (eurFiatPrice) => {
    set((state) => {
      const initialSimPrice = eurFiatPrice > 0 ? eurFiatPrice : INITIAL_SIM_PRICE;
      const shouldUpdateSimPrice = state.simSliderPrice === INITIAL_SIM_PRICE || state.simSliderPrice === 0;
      
      return {
        eurFiatPrice,
        oneFiatSats: calculateOneFiatSats(eurFiatPrice),
        ...(shouldUpdateSimPrice && {
          simSliderPrice: initialSimPrice,
          simSats: convertEuroToSats(state.simFiatPrice, initialSimPrice),
          simOneFiatSats: calculateOneFiatSats(initialSimPrice)
        })
      };
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
  },

  onSimFiatPriceChange: (euroAmount) => {
    const fiatAmount = parseFloat(euroAmount);
    set((state) => ({
      simFiatPrice: fiatAmount,
      simSats: convertEuroToSats(fiatAmount, state.simSliderPrice),
      simOneFiatSats: calculateOneFiatSats(state.simSliderPrice)
    }));
  },

  onSimBtcPriceChange: (btcPrice) => {
    set((state) => ({
      simSliderPrice: btcPrice,
      simSats: convertEuroToSats(state.simFiatPrice, btcPrice),
      simOneFiatSats: calculateOneFiatSats(btcPrice)
    }));
  }
}));

export default useStore;
