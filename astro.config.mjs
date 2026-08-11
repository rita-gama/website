import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    assets: 'assets' 
  },
  site: 'https://ritagama.pt',
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
