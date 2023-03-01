import { create } from 'zustand';

const useStore = create((set) => ({
  eurFiatPrice: 0,
  oneFiatSats: 0,
  convertedBitcoin: undefined,
  convertedSatoshi: undefined,
  convertedEuro: undefined,
  setEurFiatPrice: (eurFiatPrice) => {
    set(() => ({ eurFiatPrice: eurFiatPrice }));
    set(() => ({ oneFiatSats: ((1 / eurFiatPrice) * 100000000).toFixed(0) }));
  },
  onEuroInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') {
      return;
    }
    const { value } = values;
    set((state) => ({ convertedBitcoin: parseFloat((value / state.eurFiatPrice).toFixed(8)) }));
    set((state) => ({ convertedSatoshi: ((value / state.eurFiatPrice) * 100000000).toFixed(0) }));
    set(() => ({ convertedEuro: undefined }));
  },
  onBitcoinInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') {
      return;
    }
    const { value } = values;
    set(() => ({ convertedSatoshi: (value * 100000000).toFixed(0) }));
    set((state) => ({ convertedEuro: (value * state.eurFiatPrice).toFixed(2) }));
    set(() => ({ convertedBitcoin: undefined }));
  },
  onSatoshiInputChange: (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') {
      return;
    }
    const { value } = values;
    set(() => ({ convertedBitcoin: parseFloat((value / 100000000).toFixed(8)) }));
    set((state) => ({ convertedEuro: ((value * state.eurFiatPrice) / 100000000).toFixed(2) }));
    set(() => ({ convertedSatoshi: undefined }));
  },
}));

export default useStore;
