// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Two deploy targets that want different roots, so the default is the one that
// ships. The deliverable is a manual upload of dist/ to the praxis101.com
// document root via cPanel — so a plain `npm run build` emits a ROOT-RELATIVE
// artifact, always uploadable, and the build that matters is the one always
// being previewed.
//
// GitHub Pages is the exception: a *project* site under a path prefix at
// https://band.github.io/praxis101-com/. The deploy workflow supplies that
// prefix through SITE_BASE (and its origin through SITE_URL). Nothing else in
// the source changes, because every asset path is built from
// import.meta.env.BASE_URL via src/lib/asset.ts.
const site = process.env.SITE_URL ?? 'https://praxis101.com';
const base = process.env.SITE_BASE;

export default defineConfig({
  site,
  // Spread rather than `base: undefined` — Astro only defaults to '/' when the
  // key is absent.
  ...(base ? { base } : {}),

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
