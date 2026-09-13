// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages *project* site: https://band.github.io/praxis101-com/
// `base` supplies that URL prefix. When this moves to the praxis101.com custom
// domain, drop the `base` line and set `site` to the domain — nothing else changes,
// because asset paths are built from import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://band.github.io',
  base: '/praxis101-com',

  // Fetched from Fontsource at *build* time and emitted into our own output, so
  // the served site has no third-party font dependency. Nothing is added to
  // package.json; the provider does the fetching. Plus Jakarta Sans is a variable
  // font (200-800 on one axis), so the whole weight range is a single woff2.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-p5',
      weights: ['200 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['HelveticaNeue', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
