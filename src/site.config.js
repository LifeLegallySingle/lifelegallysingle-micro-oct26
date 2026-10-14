// ─────────────────────────────────────────────────────────────
// One file to edit. Everything else reads from here.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  origin: 'https://lifelegallysingle.com',
  brand: 'Life Legally Single™',
  brandPlain: 'Life Legally Single',
  tagline: 'Being Single is a Power Move',
  description:
    'Being Single is a Power Move. Life Legally Single™ helps solo and single earners build a life on purpose across five pillars: Mind, Body, Heart, Glow, and Wallet. Guides, tools, and the Freedom Tax™ calculator live at legallysingle.com.',
  locale: 'en_US',
  themeColor: '#080808',
};

// The main site owns ALL topical SEO. Every deep link points there.
export const MAIN = {
  origin: 'https://legallysingle.com',
  // Update these paths to the real URLs on legallysingle.com.
  // Leave '/' if a page doesn't exist yet.
  paths: {
    home: '/',
    freedomTax: '/', // e.g. '/freedom-tax-calculator/'
    selfPartnered: '/', // e.g. '/self-partnered-system/'
    powerMoves: '/', // e.g. '/power-moves/'
    pillars: { mind: '/', body: '/', heart: '/', glow: '/', wallet: '/' },
    privacy: '/privacy-policy/',
  },
  // Brand social profiles (JSON-LD sameAs). Full URLs.
  sameAs: [
    // 'https://www.instagram.com/…',
    // 'https://www.tiktok.com/@…',
  ],
};

// UTM tags on visible links so legallysingle.com analytics credits this site.
// JSON-LD and llms.txt use clean URLs (no UTMs) on purpose.
const UTM = { utm_source: 'lifelegallysingle.com', utm_medium: 'referral', utm_campaign: 'power-move' };

export function mainUrl(path = '/', content) {
  const u = new URL(path, MAIN.origin);
  Object.entries({ ...UTM, ...(content ? { utm_content: content } : {}) }).forEach(([k, v]) =>
    u.searchParams.set(k, v),
  );
  return u.toString();
}
export const cleanMainUrl = (path = '/') => new URL(path, MAIN.origin).toString();

// ─────────────────────────────────────────────────────────────
// BREVO: paste the values from your CURRENT Brevo form so the
// same list, double opt-in and automations keep working.
// Brevo → Contacts → Forms → (your form) → Share → HTML code:
//   <form id="sib-form" method="POST" action="https://XXXX.sibforms.com/serve/YYYY">
// Copy that action URL below. If the form has extra fields
// (e.g. FIRSTNAME), add them to extraFields with the same name.
// ─────────────────────────────────────────────────────────────
export const BREVO = {
  action: '', // ← REQUIRED: 'https://XXXX.sibforms.com/serve/YYYY'
  locale: 'en',
  extraFields: [
    // { name: 'FIRSTNAME', label: 'First name', type: 'text', autoComplete: 'given-name', required: false },
  ],
  successMessage: 'Check your inbox to confirm your subscription.',
};
