import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { buildHead } from './src/seo.js';

// Injects every SEO/LLMO tag (meta, Open Graph, JSON-LD) into index.html
// in both dev and build, from one source of truth (src/content.js + src/site.config.js).
const seoHead = () => ({
  name: 'lls-seo-head',
  transformIndexHtml: (html) => html.replace('<!--head-->', buildHead()),
});

export default defineConfig({
  plugins: [react(), seoHead()],
  build: { target: 'es2022', cssCodeSplit: false },
});
