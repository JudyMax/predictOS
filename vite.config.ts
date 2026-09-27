import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages(워크플로가 BASE_PATH=/predictOS/ 지정)는 하위 경로, Vercel·로컬은 루트에서 서빙한다
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
