import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Using "/api" as an example. Adjust according to your needs.
      '/api': {
        target: 'http://localhost:3000', // Where your backend server is running
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'build', // Default is 'dist'
  },
})
