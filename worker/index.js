// Cloudflare Worker for lifelegallysingle.com
// - www → apex, /index.html → /
// - old WordPress URLs from the Lightsail microsite: admin/xmlrpc → 410, old pages → 301 home
// - security + caching headers on every response

const APEX = 'lifelegallysingle.com';

const CSP = [
  "default-src 'self'",
  "script-src 'self' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com",
  // Brevo: the signup form posts to sibforms.com into a hidden iframe
  'form-action https://*.sibforms.com',
  'frame-src https://*.sibforms.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const GONE = /^\/(wp-admin|wp-login\.php|wp-json|wp-content|wp-includes|xmlrpc\.php|wp-cron\.php|feed|comments\/feed)(\/|$)/i;

function withHeaders(res, path) {
  const h = new Headers(res.headers);
  h.set('Content-Security-Policy', CSP);
  h.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  h.set('Cross-Origin-Opener-Policy', 'same-origin');

  if (path.startsWith('/assets/')) {
    h.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(png|svg|ico|webmanifest)$/.test(path)) {
    h.set('Cache-Control', 'public, max-age=86400');
  } else {
    h.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }
  if (path === '/llms.txt' || path === '/robots.txt') h.set('Content-Type', 'text/plain; charset=utf-8');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === `www.${APEX}`) {
      url.hostname = APEX;
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/index.html') {
      url.pathname = '/';
      return Response.redirect(url.toString(), 301);
    }
    if (GONE.test(url.pathname)) {
      return withHeaders(new Response('Gone', { status: 410 }), url.pathname);
    }

    const res = await env.ASSETS.fetch(request);

    // Old WordPress pages (no file extension) keep their link equity: 301 to the homepage.
    if (res.status === 404 && !/\.[a-z0-9]+$/i.test(url.pathname)) {
      return Response.redirect(`https://${APEX}/`, 301);
    }
    return withHeaders(res, url.pathname);
  },
};
