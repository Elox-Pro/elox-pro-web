import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // I solved the issue by adding this line
    // Uncaught (in promise) DOMException: Failed to construct 'WebSocket':
    // The URL 'wss://localhost:undefined/' is invalid
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
  },

})
