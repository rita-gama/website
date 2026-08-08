import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    assets: 'assets' 
  },
  site: 'https://rita-gama.github.io',
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
