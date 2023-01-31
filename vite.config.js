import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const { PORT = 3000 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
});
