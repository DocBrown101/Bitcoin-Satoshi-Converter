import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('react') || id.includes('node_modules/@mui/') || id.includes('node_modules/@emotion/')) {
            return 'react-mui-emotion';
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
