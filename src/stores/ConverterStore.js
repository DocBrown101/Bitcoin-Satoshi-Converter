import create from "zustand";

const useStore = create((set) => ({
  fiatPrice: 0,
  oneFiatSats: 0,
  convertedBitcoin: undefined,
  convertedSatoshi: undefined,
  convertedEuro: undefined,
  setFiatPrice: (fiatPrice) => {
    set(() => ({fiatPrice: fiatPrice}));
    set(() => ({oneFiatSats: ((1 / fiatPrice) * 100000000).toFixed(0)}));
  },
  onEuroInputChange: (event) => {
    set((state) => ({convertedBitcoin: parseFloat((event.target.value / state.fiatPrice).toFixed(8))}));
    set((state) => ({convertedSatoshi: ((event.target.value / state.fiatPrice) * 100000000).toFixed(0)}));
    set(() => ({convertedEuro: undefined}));
  },
  onBitcoinInputChange: (event) => {
    set(() => ({convertedSatoshi: (event.target.value * 100000000).toFixed(0)}));
    set((state) => ({convertedEuro: (event.target.value * state.fiatPrice).toFixed(2)}));
    set(() => ({convertedBitcoin: undefined}));
  },
  onSatoshiInputChange: (event) => {
    set(() => ({convertedBitcoin: parseFloat((event.target.value / 100000000).toFixed(8))}));
    set((state) => ({convertedEuro: ((event.target.value * state.fiatPrice) / 100000000).toFixed(2)}));
    set(() => ({convertedSatoshi: undefined}));
  }
}));

export default useStore;
