import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    target: ['chrome117', 'edge121', 'firefox121', 'safari17'],
  },
});
