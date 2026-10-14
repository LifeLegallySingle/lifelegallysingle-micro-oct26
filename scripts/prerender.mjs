// Turns the client build into fully rendered static HTML (crawlers and LLMs
// read the content without running JavaScript), then writes sitemap, llms.txt
// and the 404 page.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const dist = resolve('dist');
const ssr = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
let template = await readFile(resolve(dist, 'index.html'), 'utf8');

// Preload the hero face so the tagline paints in Bodoni on first render.
const { readdir } = await import('node:fs/promises');
const heroFont = (await readdir(resolve(dist, 'assets'))).find((f) => /^inter-tight-latin-wght-normal-.*\.woff2$/.test(f));
if (heroFont) {
  template = template.replace(
    '</head>',
    `  <link rel="preload" href="/assets/${heroFont}" as="font" type="font/woff2" crossorigin>\n  </head>`,
  );
}

// Home
await writeFile(resolve(dist, 'index.html'), template.replace('<!--app-->', ssr.render()));

// 404 (noindex, no canonical, no JSON-LD)
const nf = template
  .replace('<!--app-->', ssr.renderNotFound())
  .replace(/<title>[^<]*<\/title>/, '<title>Page not found | Life Legally Single™</title>')
  .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow">')
  .replace(/<link rel="canonical"[^>]*>\s*/, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, '')
  .replace('<body>', '<body data-page="404">');
await writeFile(resolve(dist, '404.html'), nf);

// Sitemap: one URL on purpose. This site exists to point at legallysingle.com.
const today = new Date().toISOString().slice(0, 10);
await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ssr.SITE.origin}/</loc><lastmod>${today}</lastmod></url>
</urlset>
`,
);

await writeFile(resolve(dist, 'llms.txt'), ssr.llmsTxt());

await rm(resolve('dist-ssr'), { recursive: true, force: true });
console.log('✓ prerendered index.html, 404.html, sitemap.xml, llms.txt');
