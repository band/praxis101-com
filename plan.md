# praxis101-net — Astro port

Rebuild of the old Skeleton site as an Astro + Tailwind site.

Status as of **2026-09-12**: built on Astro 7.3.2 + Tailwind 4.3.3, deployed to GitHub Pages.

## Scope for this pass

One page carrying the existing content:

- the site title
- the Cape Hatteras photo and its caption
- three links — Blog archive, Earlier work, Massive Wiki work

…deployed to GitHub Pages.

**End goal, a later step:** serve this layout on **praxis101.com**.

Everything else from the old repo is out of scope and deliberately untouched.

## Decisions

| | |
|---|---|
| Canonical source | Root `index.html`. The old `public/` was a staging copy — byte-identical but for the title's heading level. |
| CSS | **Tailwind 4 replaces Skeleton.** `skeleton.css`, `normalize.css` and `custom.css` are deleted. |
| "More?" popover | Dropped. It linked only to Skeleton's own repo and colophon, and had been dead for years (see below). |
| Blogs page | Not ported. Out of scope for this pass. |

### Keeping the Skeleton look without Skeleton

Values were read out of `git show 05b0117:css/skeleton.css` rather than recalled (that commit is
the last one holding the Skeleton CSS; it was pruned from the tree on 2026-09-12), and converted from
Skeleton's 62.5% root-font rem scale (1rem = 10px) to px:

- Raleway 300/400/600, body 15px / 1.6, ink `#222`
- links `#1EAEDB`, hover `#0FA0CE`, rules `#eee`
- 800px centered column (Skeleton's `.container` with `custom.css`'s cap folded in)
- Skeleton's real breakpoints — 400px, 550px, 750px — declared in `@theme` as `xs`, `phablet`,
  `tablet`, with Tailwind's own defaults cleared so no stray breakpoint leaks in
- navbar hidden below 750px, 65px tall, 11px uppercase links at 2px letter-spacing

## What was broken before, and what the port did about it

1. **`js/site.js` was missing from the repo** — referenced by both index pages, present only in the
   gitignored `Skeleton-gh-pages/`. The "More?" popover and the dock-on-scroll navbar have been
   dead on the live site for years. Popover dropped; dock not reimplemented.
2. **`css/github-prettify-theme.css` missing** — same cause. Removed.
3. **`google-code-prettify.googlecode.com` is dead** (Google Code shut down 2016). Removed; nothing
   used `prettyprint`.
4. **`blogs/index.html` favicon path** `../../dist/images/favicon.png` resolved above the repo root.
   Moot — page not ported.
5. **Root `index.html:43`** opened `<h4>` and closed `</h5>`.
6. **The photo overflowed.** It is 1280px wide inside an 800px column and neither Skeleton nor
   `custom.css` constrained images. Tailwind's preflight fixes this.

### Two bugs introduced and fixed during the port

- **Tailwind was not scanning the Astro templates.** Auto-detection produced only `.visible`,
  `.static`, `.container`, and a `.fill-rule` utility false-matched from an SVG attribute under
  `public/`. The page would have shipped unstyled. Fixed with `source(none)` plus explicit
  `@source` lines in `global.css`.
- **`import.meta.env.BASE_URL` carries no trailing slash**, so the first build emitted
  `/praxis101-netimages/…`. All asset paths now go through `src/lib/asset.ts`, which normalises
  both sides. This is also what makes the praxis101.com move a one-line config change.

## Layout

```
astro.config.mjs          site + base + tailwind vite plugin
.github/workflows/deploy.yml
public/                   static, copied verbatim
  favicon.ico
  images/                 all originals carried over unpruned
  works/                  the 1985 PDF
src/
  layouts/Base.astro
  components/Navbar.astro
  pages/index.astro
  lib/asset.ts
  styles/global.css       tokens + .container-p5; ~50 lines
```

## Open

- **Push and enable Pages.** Workflow triggers on `main`; this work is on `astro-port`. Pages is
  not currently enabled on `band/praxis101-net`.
- **praxis101.com.** The live site currently resolves to AWS EC2 (`98.84.224.111`,
  `18.208.88.157`), not GitHub Pages. Moving it means a DNS change plus dropping `base` and
  setting `site` to the domain.
(Pruned 2026-09-12 — see below. Nothing else is outstanding.)

## Pruned 2026-09-12

Removed 15 unreferenced images and the superseded `index.html`, `blogs/index.html`, `css/*.css`
and `bower.json`. All recoverable from `05b0117`.

Two things were **kept** after checking them against the live sites, which are still served from
AWS and independent of this repo:

- `public/works/Anderson_1985_4TypesOfFixes-CCI.pdf` — returns 200 at both
  `praxis101.com/works/…` and `praxis101.net/works/…`. It is a published URL, and deleting it
  would break that link the moment praxis101.com moves onto this repo.
- `public/images/favicon.png` — returns 200 at `praxis101.com/images/favicon.png`.

Every other image 404s on the live site and was referenced by nothing here.
