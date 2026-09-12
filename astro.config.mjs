// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages *project* site: https://band.github.io/praxis101-net/
// `base` supplies that URL prefix. When this moves to the praxis101.com custom
// domain, drop the `base` line and set `site` to the domain — nothing else changes,
// because asset paths are built from import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://band.github.io',
  base: '/praxis101-net',
  vite: {
    plugins: [tailwindcss()],
  },
});
