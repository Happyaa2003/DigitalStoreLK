import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PricingRegion } from '@/types';

interface PricingStore {
  region: PricingRegion;
  setRegion: (region: PricingRegion) => void;
}

export const usePricingStore = create<PricingStore>()(
  persist(
    (set) => ({
      region: 'LK',
      setRegion: (region) => set({ region }),
    }),
    {
      name: 'digitalstorelk-pricing-region',
    }
  )
);
