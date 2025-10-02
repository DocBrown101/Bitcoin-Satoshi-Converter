import { create } from "zustand";

const INITIAL_SLIDER_PRICE = 85_000;
const SATS_PER_BTC = 100_000_000;

const useStore = create((set) => ({
  sats: ((10 / INITIAL_SLIDER_PRICE) * SATS_PER_BTC).toFixed(0),
  fiatPrice: 10,
  sliderPrice: INITIAL_SLIDER_PRICE,
  oneFiatSats: ((1 / INITIAL_SLIDER_PRICE) * SATS_PER_BTC).toFixed(0),

  onFiatPriceChange: (values) => {
    const { value } = values;
    set(() => ({ fiatPrice: parseFloat(value) }));
    set((state) => ({ sats: ((state.fiatPrice / state.sliderPrice) * SATS_PER_BTC).toFixed(0) }));
    set((state) => ({ oneFiatSats: ((1 / state.sliderPrice) * SATS_PER_BTC).toFixed(0) }));
  },
  onSliderPriceChange: (event, newValue) => {
    set(() => ({ sliderPrice: newValue }));
    set((state) => ({ sats: ((state.fiatPrice / state.sliderPrice) * SATS_PER_BTC).toFixed(0) }));
    set((state) => ({ oneFiatSats: ((1 / state.sliderPrice) * SATS_PER_BTC).toFixed(0) }));
  },
  onInputChange: (event) => {
    set(() => ({ sliderPrice: event.target.value }));
    set((state) => ({ sats: ((state.fiatPrice / state.sliderPrice) * SATS_PER_BTC).toFixed(0) }));
    set((state) => ({ oneFiatSats: ((1 / state.sliderPrice) * SATS_PER_BTC).toFixed(0) }));
  },
}));

export default useStore;
