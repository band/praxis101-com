// Joins a path onto Astro's configured base.
//
// import.meta.env.BASE_URL is '/' by default — the root-relative build that
// gets uploaded to praxis101.com — and '/praxis101-com' (no trailing slash)
// when the Pages workflow sets SITE_BASE. Naive concatenation breaks one case
// or the other, so both sides are normalised and neither target needs a
// source change.
const base = import.meta.env.BASE_URL;

export function asset(path: string): string {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
