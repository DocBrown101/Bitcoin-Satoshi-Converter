import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('@mui/system') ||
            id.includes('@mui/material/styles') ||
            id.includes('@mui/lab') ||
            id.includes('@mui/styled-engine')) {
            return 'mui-core';
          }
          if (id.includes('@mui/material') && !id.includes('styles')) {
            return 'mui-components';
          }
          if (id.includes('@mui/icons-material')) {
            return 'mui-icons';
          }
          if (id.includes('@emotion/')) {
            return 'emotion';
          }
          if (id.includes('@tanstack/')) {
            return 'query';
          }
          if (id.includes('i18next')) {
            return 'i18n';
          }
          if (id.includes('node_modules')) {
            return 'node-modules';
          }
        },
      }
    },
  },
});
