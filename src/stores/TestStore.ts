import { create } from 'zustand';

interface ConverterStore {
  bears: number
  eurFiatPrice: number
  oneFiatSats: number
  convertedBitcoin: number | undefined
  convertedSatoshi: number | undefined
  convertedEuro: number | undefined
  setEurFiatPrice: (eurFiatPrice: number) => void
  increase: (by: number) => void
}

const useConverterStore = create<ConverterStore>()((set) => ({
  bears: 0,
  eurFiatPrice: 0,
  oneFiatSats: 0,
  convertedBitcoin: undefined,
  convertedSatoshi: undefined,
  convertedEuro: undefined,
  setEurFiatPrice: (eurFiatPrice: number) => {
    set(() => ({ eurFiatPrice: eurFiatPrice }));
    set(() => ({ oneFiatSats: parseFloat(((1 / eurFiatPrice) * 100000000).toFixed(0)) }));
  },
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

export default useConverterStore;