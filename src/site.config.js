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
  themeColor: '#0e0a1a',
  socialProof: 'Join 200K+ SoloAchievers™ thriving solo with the Self-Partnered System™.',
};

// Official logo. Hotlinked from legallysingle.com so it always matches the main site.
// For extra resilience, download it into /public/logo.png and set src: '/logo.png'.
export const LOGO = {
  src: 'https://legallysingle.com/wp-content/uploads/2025/12/cropped-LOGO.png',
  alt: 'Life Legally Single logo',
};

// The main site owns ALL topical SEO. Every deep link points there.
export const MAIN = {
  origin: 'https://legallysingle.com',
  // Update these paths to the real URLs on legallysingle.com.
  // Leave '/' if a page doesn't exist yet.
  paths: {
    home: '/',
    freedomTax: '/freedom-tax-calculator/',
    selfPartnered: '/self-partnered-system/',
    powerMoves: '/#lls-power-move',
    joinCreator: '/join-as-creator/',
    // All pillars point to the main site's Power Move picker until each has its own page.
    pillars: {
      mind: '/#lls-power-move',
      body: '/#lls-power-move',
      heart: '/#lls-power-move',
      glow: '/#lls-power-move',
      wallet: '/unweddedwallet/',
    },
    privacy: '/privacy-policy/',
  },
  // Brand social profiles (JSON-LD sameAs). Full URLs.
  sameAs: [
    'https://www.facebook.com/lifelegallysingle/',
    'https://x.com/singleceleb',
    // add Instagram / TikTok / Bluesky profile URLs here
  ],
  // Destinations shown in the big "Go to legallysingle.com" section.
  tools: [
    { name: 'Freedom Tax Calculator™', path: '/freedom-tax-calculator/', line: 'What single life costs in your city.' },
    { name: 'UnWedded Wallet™', path: '/unweddedwallet/', line: 'Money built on one income.' },
    { name: 'Self-Partnered System™', path: '/self-partnered-system/', line: 'The framework behind it all.' },
    { name: 'Datebase™', path: '/datebase/', line: 'Date with intention.' },
    { name: 'Solo travel', path: '/solo-travel/', line: 'Trips that match your energy.' },
    { name: 'Community', path: '/community/', line: 'Find your people.' },
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
