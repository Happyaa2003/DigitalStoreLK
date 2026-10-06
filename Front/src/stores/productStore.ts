import { create } from 'zustand';
import defaultProducts from '@/data/products.json';
import type { Product } from '@/types';

const GITHUB_RAW_URL =
  'https://raw.githubusercontent.com/Happyaa2003/DigitalStoreLK/main/Front/src/data/products.json';
const CACHE_KEY = 'digitalstorelk-cached-products';
const CACHE_TIME_KEY = 'digitalstorelk-cached-products-time';

// 1. Initial cached products from localStorage or bundled default
function getInitialProducts(): Product[] {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as Product[];
      }
    }
  } catch {
    // Ignore storage parse errors
  }
  return defaultProducts as Product[];
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  lastUpdated: number | null;
  fetchLatest: (force?: boolean) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: getInitialProducts(),
  isLoading: false,
  lastUpdated: null,

  fetchLatest: async (force = false) => {
    // Avoid spamming requests if checked within the last 30 seconds unless forced
    const now = Date.now();
    const lastCheck = get().lastUpdated;
    if (!force && lastCheck && now - lastCheck < 30_000) {
      return;
    }

    set({ isLoading: true });

    try {
      // Bust cache with timestamp query param
      const url = `${GITHUB_RAW_URL}?_t=${now}`;
      const res = await fetch(url, {
        cache: 'no-cache',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch latest products: ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        set({
          products: data as Product[],
          isLoading: false,
          lastUpdated: now,
        });

        // Cache in localStorage for instant offline / repeat visits
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
          localStorage.setItem(CACHE_TIME_KEY, now.toString());
        } catch {
          // Ignore storage quota errors
        }
      } else {
        set({ isLoading: false });
      }
    } catch {
      // In case of network failure or offline, keep existing / bundled products
      set({ isLoading: false });
    }
  },
}));

// Automatically trigger background fetch upon initial application load
if (typeof window !== 'undefined') {
  // Run on idle or immediately
  setTimeout(() => {
    useProductStore.getState().fetchLatest();
  }, 100);
}
