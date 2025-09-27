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
          if (id.includes('react')) {
            return 'react-and-tools';
          }
          if (id.includes('node_modules/@mui/') || id.includes('node_modules/@emotion/')) {
            return 'mui-emotion';
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
