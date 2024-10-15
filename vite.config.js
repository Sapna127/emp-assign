import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  },
  build: {
    outDir: 'dist', 
  },
  server: {
    open: true,      
    port: 3000,      
  },
  resolve: {
    alias: {
    }
  },
});
