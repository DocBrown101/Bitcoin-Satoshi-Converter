import { create } from "zustand";

const useStore = create((set) => ({
  fiatPrice: 0,
  oneFiatSats: 0,
  convertedBitcoin: undefined,
  convertedSatoshi: undefined,
  convertedEuro: undefined,
  setFiatPrice: (fiatPrice) => {
    set(() => ({ fiatPrice: fiatPrice }));
    set(() => ({ oneFiatSats: ((1 / fiatPrice) * 100000000).toFixed(0) }));
  },
  onEuroInputChange: (values) => {
    const { value } = values;
    set((state) => ({ convertedBitcoin: parseFloat((value / state.fiatPrice).toFixed(8)) }));
    set((state) => ({ convertedSatoshi: ((value / state.fiatPrice) * 100000000).toFixed(0) }));
    set(() => ({ convertedEuro: undefined }));
  },
  onBitcoinInputChange: (values) => {
    const { value } = values;
    set(() => ({ convertedSatoshi: (value * 100000000).toFixed(0) }));
    set((state) => ({ convertedEuro: (value * state.fiatPrice).toFixed(2) }));
    set(() => ({ convertedBitcoin: undefined }));
  },
  onSatoshiInputChange: (values) => {
    const { value } = values;
    set(() => ({ convertedBitcoin: parseFloat((value / 100000000).toFixed(8)) }));
    set((state) => ({ convertedEuro: ((value * state.fiatPrice) / 100000000).toFixed(2) }));
    set(() => ({ convertedSatoshi: undefined }));
  },
}));

export default useStore;
