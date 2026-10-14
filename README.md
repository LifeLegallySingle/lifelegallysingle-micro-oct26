# lifelegallysingle.com

React 19 + Vite, prerendered to static HTML, served by a Cloudflare Worker.
See STRATEGY.md for the SEO/LLMO plan.

## Before you deploy (2 edits)
1. **Brevo:** open `src/site.config.js` and paste your existing Brevo form's
   action URL into `BREVO.action` (Brevo → Contacts → Forms → your form → Share →
   HTML code → the `action="https://….sibforms.com/serve/…"` value). Same list,
   same double opt-in, same automations.
2. **Main-site links:** in the same file, set `MAIN.paths` to the real URLs on
   legallysingle.com (Freedom Tax™ calculator, pillars, privacy). Optional:
   add social profiles to `MAIN.sameAs`.

## Run locally
```
npm install
npm run dev        # http://localhost:5173
npm run preview    # production build in the Workers runtime
```

## Deploy to Cloudflare
1. Cloudflare dashboard → lifelegallysingle.com → DNS: **delete the A/AAAA (and
   www) records pointing to Lightsail (184.73.182.7)**. The Worker creates its own.
2. `npx wrangler login`
3. `npm run deploy`
4. Visit https://lifelegallysingle.com and check: page loads, signup works,
   https://lifelegallysingle.com/llms.txt and /sitemap.xml load.
5. Security → Bots: make sure "Block AI bots" is off for this zone.
6. Then shut down the Lightsail `LLS_microsite` instance and release its static IP.

GitHub deploys (optional): Workers & Pages → Create → Import a repository →
build command `npm run build`, deploy command `npx wrangler deploy`.

## Where things live
| File | What it does |
|---|---|
| `src/site.config.js` | Domains, main-site links, Brevo settings |
| `src/content.js` | All copy: pillars, Power Moves, vocabulary, FAQ (also feeds JSON-LD + llms.txt) |
| `src/seo.js` | Meta tags, Open Graph, JSON-LD graph, llms.txt |
| `src/components/PillarOrbit.jsx` | Interactive hero: pillars orbiting the logo |
| `src/components/Logo.jsx` | Official logo (hotlinked from legallysingle.com) with built-in fallback |
| `src/components/Declaration.jsx` | Declaration builder + share image |
| `src/components/BrevoSignup.jsx` | Newsletter form (posts to your Brevo form) |
| `worker/index.js` | Redirects, 410s for old WordPress paths, security + cache headers |
| `scripts/prerender.mjs` | Static HTML, 404, sitemap, llms.txt at build time |
