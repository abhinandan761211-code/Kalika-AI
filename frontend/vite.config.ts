import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // KALIKA AI owns its own port range so it never collides with other
    // local Vite projects (which default to 5173/5174).
    port: 4300,
    strictPort: true,
    host: 'kalika.localhost',
  },
  preview: {
    port: 4300,
    strictPort: true,
    host: 'kalika.localhost',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
});
