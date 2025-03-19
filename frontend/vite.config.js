import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: false, // ✅ Allow HTTP for local testing
  },
  plugins: [react()],
})
