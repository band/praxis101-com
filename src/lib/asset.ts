// Joins a path onto Astro's configured base.
//
// import.meta.env.BASE_URL is '/praxis101-net' (no trailing slash) under the
// current config, but '/' when no base is set — so naive concatenation breaks
// one case or the other. Normalising both sides keeps the two deploy targets
// (GitHub Pages project site now, praxis101.com later) working unchanged.
const base = import.meta.env.BASE_URL;

export function asset(path: string): string {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
