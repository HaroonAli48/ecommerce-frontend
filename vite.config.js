import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows external access (needed for Render)
    port: process.env.PORT || 5173,  // Uses Render's PORT or fallback to 5173
  },
});
