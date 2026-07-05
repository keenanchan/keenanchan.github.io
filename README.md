# keenanchan.com

Personal portfolio site. Built with [Astro](https://astro.build) — static output, zero hosting cost, deployed to GitHub Pages on every push to `main`.

## Quick start

```bash
npm install          # once
npm run dev          # dev server at http://localhost:4321
npm run build        # production build to dist/
npm test             # Playwright tests against the production build (build first)
```

## How to update the site

Almost everything you'd want to change lives in three places:

| What | Where |
|------|-------|
| Name, tagline, bio, email, phone, resume URL, social links | [`src/data/site.ts`](src/data/site.ts) |
| Experience, education, skills (About page) | [`src/data/resume.ts`](src/data/resume.ts) |
| Projects | [`src/content/projects/*.md`](src/content/projects/) |

**Add a project:** copy any file in `src/content/projects/`, edit the frontmatter (title, description, date, url, image), and drop the cover image in `src/assets/projects/`. Set `featured: true` to show it on the homepage. That's it — the Projects page and homepage pick it up automatically.

**Change colors/theme:** all design tokens (light + dark) are CSS variables at the top of [`src/styles/global.css`](src/styles/global.css).

**Add a page:** create `src/pages/yourpage.astro`, wrap content in `<BaseLayout>`, and add a link in `src/components/Header.astro`.

## Interactive components (dataviz, etc.)

React is wired up via `@astrojs/react`. Any `.tsx` component in `src/components/` can be dropped into a page with a hydration directive:

```astro
<MyChart client:load data={...} />
```

See `src/components/CopyEmailButton.tsx` + its usage in `src/pages/contact.astro` for a working example. Pages without islands ship zero JavaScript.

## Testing

Playwright tests live in [`tests/`](tests/) and run on desktop Chrome + mobile (iPhone 13 viewport):

- navigation, mobile hamburger menu, dark/light theme toggle + persistence
- content wiring (data files → pages), project count/order, link targets
- every image actually loads; custom 404; React island clipboard behavior

CI runs the full suite before every deploy (`.github/workflows/deploy.yml`).

## Deployment & DNS (one-time setup)

The GitHub Actions workflow deploys to GitHub Pages automatically. The site is live at **https://keenanchan.github.io** right away. To point **keenanchan.com** at it after cancelling Framer:

1. In your DNS provider, set:
   - `www` → CNAME → `keenanchan.github.io`
   - apex `keenanchan.com` → A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. Set the custom domain (either in repo → Settings → Pages, or):
   ```bash
   gh api repos/keenanchan/keenanchan.github.io/pages -X PUT -f cname=www.keenanchan.com
   ```
   Check "Enforce HTTPS" once the cert is issued (a few minutes after DNS propagates).
3. Note: `resume.keenanchan.com` currently points at a separate server (5.78.107.91) — leave that DNS record alone, or update `resumeUrl` in `src/data/site.ts` if you move the resume.

The previous contents of this repo (a 2024 Jekyll starter) are preserved on the `old-jekyll-site` branch.
