import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Для Electron в dev-режиме разрешаем загрузку из localhost
  server: {
    port: 5173,
    strictPort: true,
  },
  // Для сборки — корень остаётся по умолчанию (src/)
  build: {
    outDir: 'dist'
  }
})