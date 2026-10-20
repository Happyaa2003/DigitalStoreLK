import { create } from 'zustand';
import type { Product, Plan } from '@/types';

export interface CartItem {
  product: Product;
  selectedPlan: Plan;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, plan?: Plan, quantity?: number) => void;
  removeItem: (productId: string, planId: string) => void;
  updateQuantity: (productId: string, planId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalCount: () => number;
}

const STORAGE_KEY = 'digitalstorelk_cart';

function getInitialCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return [];
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: getInitialCart(),
  isOpen: false,

  addItem: (product, plan, quantity = 1) => {
    const selectedPlan = plan || product.plans[0] || {
      id: `${product.id}-default`,
      name: 'Standard',
      duration: '1 Month',
      price: { LK: 'Contact for Price', GLOBAL: 'Contact for Price' },
      description: product.shortDescription,
    };

    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.product.id === product.id && i.selectedPlan.id === selectedPlan.id
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems = [...state.items, { product, selectedPlan, quantity }];
      }
      saveCart(newItems);
      return { items: newItems };
    });
  },

  removeItem: (productId, planId) => {
    set((state) => {
      const newItems = state.items.filter(
        (i) => !(i.product.id === productId && i.selectedPlan.id === planId)
      );
      saveCart(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (productId, planId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, planId);
      return;
    }
    set((state) => {
      const newItems = state.items.map((i) => {
        if (i.product.id === productId && i.selectedPlan.id === planId) {
          return { ...i, quantity };
        }
        return i;
      });
      saveCart(newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  totalCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
