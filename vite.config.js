import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
  base: isProduction ? '/EduNexa/' : '/',
  server: {
    host: true,
    port: 5173,
  },
});