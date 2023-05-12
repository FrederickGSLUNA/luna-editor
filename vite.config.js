import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  rollupOptions: {
    input: {
      main: './index.html',
      robots: './robots.txt'
    }
  }
})
