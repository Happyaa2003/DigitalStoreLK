import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const basePath = process.env.VITE_BASE_PATH || (mode === 'production' ? '/DigitalStoreLK/' : '/')
  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      watch: {
        ignored: ['**/Products/**', '**/Accerts/**', '**/.git/**'],
      },
    },
  }
})
