import { create } from 'zustand';

type Theme = 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// DigitalStoreLK is pure dark mode only
function applyDarkTheme() {
  const root = document.documentElement;
  root.classList.add('dark');
  root.setAttribute('data-theme', 'dark');
  try {
    localStorage.setItem('digitalstorelk_theme', 'dark');
  } catch {
    // ignore
  }
}

// Always apply dark mode immediately on file load
applyDarkTheme();

export const useThemeStore = create<ThemeStore>(() => ({
  theme: 'dark',
  toggleTheme: () => {
    applyDarkTheme();
  },
  setTheme: () => {
    applyDarkTheme();
  },
}));
