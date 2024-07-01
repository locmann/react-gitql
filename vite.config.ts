import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      apollo: '/src/apollo',
      context: '/src/context',
      constants: '/src/constants',
      components: '/src/components',
      data: '/src/data',
      features: '/src/features',
      hooks: '/src/hooks',
      providers: '/src/providers',
      services: '/src/services',
      store: '/src/store',
      styles: '/src/styles',
      types: '/src/types',
      ui: '/src/ui',
      utils: '/src/utils',
    },
  },
});
