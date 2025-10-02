import {create} from 'zustand';
import {convertEuroToSats, calculateOneFiatSats} from '../utils/currencyConverter';

const INITIAL_SLIDER_PRICE = 85_000;

const useStore = create((set) => ({
  sats: convertEuroToSats(10, INITIAL_SLIDER_PRICE),
  fiatPrice: 10,
  sliderPrice: INITIAL_SLIDER_PRICE,
  oneFiatSats: calculateOneFiatSats(INITIAL_SLIDER_PRICE),

  onFiatPriceChange: (euroAmount) => {
    const fiatAmount = parseFloat(euroAmount);
    set((state) => ({
      fiatPrice: fiatAmount,
      sats: convertEuroToSats(fiatAmount, state.sliderPrice),
      oneFiatSats: calculateOneFiatSats(state.sliderPrice)
    }));
  },

  onBtcPriceChange: (btcPrice) => {
    set((state) => ({
      sliderPrice: btcPrice,
      sats: convertEuroToSats(state.fiatPrice, btcPrice),
      oneFiatSats: calculateOneFiatSats(btcPrice)
    }));
  }
}));

export default useStore;
