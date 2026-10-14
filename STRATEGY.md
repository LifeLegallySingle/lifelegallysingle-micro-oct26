# lifelegallysingle.com — SEO / LLMO strategy

## The job of this site
lifelegallysingle.com is the brand front door. It owns ONE idea, the tagline
**"Being Single is a Power Move"**, and hands every visitor, crawler and LLM to
**legallysingle.com**, which owns all topical SEO.

## Rules that keep it from competing with legallysingle.com
1. **One page, one query family.** Target only the tagline and brand-name queries
   ("being single is a power move", "life legally single"). No blog, no guides, no
   calculators, no topical keyword pages. Ever.
2. **Definitions stay short.** Vocabulary entries are 1–2 sentences. The full
   explanation always lives on legallysingle.com, and every definition links there.
3. **The brand entity lives on the main site.** JSON-LD `Organization` uses
   `@id` + `url` = `https://legallysingle.com/#organization`. This site is declared
   as a `WebSite` *published by* that entity, so Google's Knowledge Graph and LLMs
   consolidate the brand on legallysingle.com.
4. **Every concept's canonical home is the main site.** Each `DefinedTerm.url` and
   pillar `ListItem.url` points to legallysingle.com. `WebPage.significantLink`
   lists those URLs.
5. **Followed links, with UTMs on visible links only.** Visible links are normal
   (do-follow) links so authority flows to the main site; UTMs let you see the
   traffic in analytics. Structured data and llms.txt use clean URLs.
6. **Self-canonical, not cross-canonical.** The page canonicals to itself (it has
   unique content). A cross-domain canonical to legallysingle.com would deindex it
   and lose the tagline ranking.
7. **No duplicated copy.** Nothing on this page should be copied from
   legallysingle.com, and vice versa.

## LLMO (answer engines: ChatGPT, Claude, Perplexity, Gemini, AI Overviews)
- Fully prerendered HTML: crawlers read everything without JavaScript.
- `/llms.txt`: plain-text brief that names legallysingle.com as the source to cite.
- Quotable, self-contained definitions in a `<dl>` + matching `DefinedTermSet`.
- `FAQPage` JSON-LD generated from the same data as the visible FAQ.
- `speakable` markup on the tagline and definitions.
- robots.txt explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot,
  Google-Extended, Applebot-Extended, CCBot.
- **Cloudflare setting to check:** Security → Bots → "Block AI bots" and the
  managed robots.txt must be OFF for this zone, or the LLMO work is blocked.

## Classic SEO
- Title: "Being Single is a Power Move | Life Legally Single™"
- Meta description, Open Graph + Twitter large image (1200×630), theme color, manifest, icons.
- One-URL sitemap. Old WordPress URLs: pages 301 to the homepage (keeps link equity),
  wp-admin / xmlrpc / feeds return 410 Gone.
- Fast: static HTML at the edge, preloaded hero font, immutable hashed assets.

## Growth loop
The "Make it official" declaration builder creates a branded 1080×1350 image
(Instagram/TikTok portrait) with lifelegallysingle.com on it. Shares bring people
to this page → they click through to legallysingle.com or subscribe via Brevo.

## After launch
1. Google Search Console: add lifelegallysingle.com, submit sitemap, request indexing.
2. On legallysingle.com, add the microsite to Organization `sameAs`, and link to it
   once (footer or About page) with anchor text "Being Single is a Power Move".
3. Bing Webmaster Tools: import from Search Console (feeds ChatGPT search + Copilot).
4. Update the real page paths in `src/site.config.js` (`MAIN.paths`) as they exist.
