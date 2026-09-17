import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AdminStore {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: (token: string) => set({ isAuthenticated: true, token }),
      logout: () => set({ isAuthenticated: false, token: null }),
    }),
    {
      name: 'digitalstorelk-admin-auth',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
