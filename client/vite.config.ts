import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    // Same-origin API calls in development, no CORS needed
    proxy: {
      '/api': 'http://localhost:2500',
    },
  },
});
