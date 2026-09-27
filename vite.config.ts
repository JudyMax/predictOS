import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages는 https://judymax.github.io/predictOS/ 아래에서 서빙한다
  base: '/predictOS/',
  plugins: [react()],
})
