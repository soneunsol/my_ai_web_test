import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 배포 경로(/ai-vibe-coding/mini_sns/) 를 base 로 사용
export default defineConfig({
  base: '/ai-vibe-coding/mini_sns/',
  plugins: [react()],
});
