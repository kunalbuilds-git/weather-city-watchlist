import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy API calls from the Vite dev server to the Spring Boot backend.
// This avoids browser cross-origin issues during local development.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
