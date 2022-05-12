import create from "zustand";

const useStore = create((set) => ({
  sats: ((10 / 55000) * 100000000).toFixed(0),
  fiatPrice: 10,
  sliderPrice: 55000,
  oneFiatSats: ((1 / 55000) * 100000000).toFixed(0),

  onFiatPriceChange: (values) => {
    const { value } = values;
    set(() => ({ fiatPrice: parseFloat(value) }));
    set((state) => ({
      sats: ((state.fiatPrice / state.sliderPrice) * 100000000).toFixed(0),
    }));
    set((state) => ({
      oneFiatSats: ((1 / state.sliderPrice) * 100000000).toFixed(0),
    }));
  },
  onSliderPriceChange: (event, newValue) => {
    set(() => ({ sliderPrice: newValue }));
    set((state) => ({
      sats: ((state.fiatPrice / state.sliderPrice) * 100000000).toFixed(0),
    }));
    set((state) => ({
      oneFiatSats: ((1 / state.sliderPrice) * 100000000).toFixed(0),
    }));
  },
  onInputChange: (event) => {
    set(() => ({ sliderPrice: event.target.value }));
    set((state) => ({
      sats: ((state.fiatPrice / state.sliderPrice) * 100000000).toFixed(0),
    }));
    set((state) => ({
      oneFiatSats: ((1 / state.sliderPrice) * 100000000).toFixed(0),
    }));
  },
}));

export default useStore;
