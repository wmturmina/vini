import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['./src/assets/fonts'],
  base: '',
  server: {
    proxy: {
      '/django': {
        cors: false,
        target: 'http://localhost:8000/api/v1.0.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/django/, ''),
      }
    }
  }
})
