import { Fragment, useEffect, useRef, useState } from 'react';
import { Logo } from './components/Logo.jsx';
import { PillarOrbit } from './components/PillarOrbit.jsx';
import { Declaration } from './components/Declaration.jsx';
import { BrevoSignup } from './components/BrevoSignup.jsx';
import { TERMS, FAQ } from './content.js';
import { SITE, MAIN, mainUrl } from './site.config.js';

const ARROW = <span aria-hidden="true">↗</span>;

function GoMain({ where, size = '', children }) {
  return (
    <a className={`btn btn-primary ${size}`} href={mainUrl(MAIN.paths.home, where)}>
      {children || 'Go to legallysingle.com'} {ARROW}
    </a>
  );
}

export function App() {
  const [focus, setFocus] = useState(null); // { id, n } so repeat picks re-trigger
  const [showBar, setShowBar] = useState(false);
  const heroRef = useRef(null);
  const goRef = useRef(null);

  // Pointer-reactive light + ring parallax in the hero (CSS variables, no re-renders).
  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
        el.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
        el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    el.addEventListener('pointermove', move, { passive: true });
    return () => {
      el.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Sticky "Go to legallysingle.com" bar: shown once the hero scrolls away,
  // hidden again while the big legallysingle.com section is on screen.
  useEffect(() => {
    const hero = heroRef.current;
    const go = goRef.current;
    if (!hero || !go || !('IntersectionObserver' in window)) return;
    const seen = { hero: true, go: false };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (seen[e.target === hero ? 'hero' : 'go'] = e.isIntersecting));
        setShowBar(!seen.hero && !seen.go);
      },
      { threshold: 0.1 },
    );
    io.observe(hero);
    io.observe(go);
    return () => io.disconnect();
  }, []);

  const pick = (id) => setFocus((f) => ({ id, n: (f?.n || 0) + 1 }));

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="top">
        <div className="top-inner">
          <a className="brand" href="/" aria-label={`${SITE.brand} home`}>
            <Logo size={52} className="brand-logo" />
            <span className="brand-tag">
              Being Single is a Power Move<sup>™</sup>
            </span>
          </a>
          <a className="btn btn-royal btn-sm" href={mainUrl(MAIN.paths.home, 'header')}>
            Visit legallysingle.com
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" ref={heroRef} aria-labelledby="tagline">
          <div className="hero-light" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Life Legally Single · Self-Partnered System™</p>
              <h1 id="tagline" className="hero-title">
                {['Being', 'Single', 'is', 'a', 'Power', 'Move'].map((w, i) => (
                  <Fragment key={w}>
                    {i > 0 && ' '}
                    <span className="w" style={{ '--d': `${i * 70}ms` }}>
                      {w}
                      {i === 5 && <sup>™</sup>}
                    </span>
                  </Fragment>
                ))}
              </h1>
              <p className="hero-sub">{SITE.socialProof}</p>
              <p className="hero-lede">
                Not a waiting room. Not a phase. A life you build on purpose, across Mind, Body, Heart, Glow, and
                Wallet.
              </p>
              <div className="hero-ctas">
                <GoMain where="hero" size="btn-xl" />
                <a className="btn btn-outline btn-xl" href="#declare">
                  Write your declaration
                </a>
              </div>
            </div>
            <PillarOrbit active={focus?.id} onPick={pick} />
          </div>
        </section>

        <section id="declare" className="section declare" aria-labelledby="declare-h">
          <div className="section-head">
            <p className="eyebrow">Make it official</p>
            <h2 id="declare-h">Declare your next Power Moves</h2>
            <p>Pick one move for each pillar, sign it, and share it. Then go make the move.</p>
          </div>
          <Declaration focus={focus} />
        </section>

        <section className="go" ref={goRef} aria-labelledby="go-h">
          <div className="go-inner">
            <p className="eyebrow">The full platform</p>
            <h2 id="go-h">Everything else lives at legallysingle.com</h2>
            <p className="go-lede">
              Tools, guides, and the Self-Partnered System™ for dating, solo travel, community, and money.
            </p>
            <a className="go-button" href={mainUrl(MAIN.paths.home, 'big-cta')}>
              <span className="go-button-label">Go to legallysingle.com</span>
              <span className="go-button-icon" aria-hidden="true">
                ↗
              </span>
            </a>
            <ul className="go-tools">
              {MAIN.tools.map((t) => (
                <li key={t.name}>
                  <a href={mainUrl(t.path, `tool-${t.name.replace(/\W+/g, '-').toLowerCase()}`)}>
                    <span className="go-tool-name">{t.name}</span>
                    <span className="go-tool-line">{t.line}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section tax" aria-labelledby="tax-h">
          <div>
            <p className="eyebrow">UnWedded Wallet™</p>
            <h2 id="tax-h">The system was built for two incomes. You pay the difference.</h2>
          </div>
          <div className="tax-body">
            <p>
              Life Legally Single™ calls it the Freedom Tax™: the compounding wealth penalty solo earners pay in
              systems built for dual-income households.
            </p>
            <a className="btn btn-primary" href={mainUrl(MAIN.paths.freedomTax, 'freedom-tax')}>
              Calculate your Freedom Tax™ {ARROW}
            </a>
          </div>
        </section>

        <section id="vocabulary" className="section vocab" aria-labelledby="vocab-h">
          <p className="eyebrow">Glossary</p>
          <h2 id="vocab-h">The language of a single life</h2>
          <dl className="terms">
            {TERMS.map((t) => (
              <div key={t.key} className="term">
                <dt>{t.term}</dt>
                <dd>
                  {t.def}{' '}
                  <a href={mainUrl(MAIN.paths[t.path] || '/', `term-${t.key}`)}>Learn more on legallysingle.com</a>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="newsletter" className="section join" aria-labelledby="join-h">
          <div className="join-copy">
            <h2 id="join-h">One Power Move in your inbox, every week</h2>
            <p>We don’t spam, because SoloAchievers™ only make power moves. Unsubscribe anytime.</p>
          </div>
          <BrevoSignup id="brevo-main" />
        </section>

        <section id="faq" className="section faq" aria-labelledby="faq-h">
          <h2 id="faq-h">Questions</h2>
          <div className="faq-list">
            {FAQ.map((f, i) => (
              <details key={i} name="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="foot-inner">
          <div className="foot-brand">
            <Logo size={64} />
            <p className="foot-line">
              {SITE.tagline}
              <sup>™</sup>
            </p>
          </div>
          <GoMain where="footer" />
          <nav aria-label="Life Legally Single">
            <a href={mainUrl(MAIN.paths.freedomTax, 'footer')}>Freedom Tax Calculator™</a>
            <a href={mainUrl(MAIN.paths.selfPartnered, 'footer')}>Self-Partnered System™</a>
            <a href={mainUrl(MAIN.paths.joinCreator, 'footer')}>Join as a Creator</a>
            <a href={mainUrl(MAIN.paths.privacy, 'footer')}>Privacy</a>
          </nav>
          <p className="foot-small">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.brand}. All rights reserved.
          </p>
        </div>
      </footer>

      <div className={`stickybar${showBar ? ' is-on' : ''}`} aria-hidden={!showBar}>
        <a className="btn btn-primary" href={mainUrl(MAIN.paths.home, 'sticky-bar')} tabIndex={showBar ? 0 : -1}>
          Go to legallysingle.com {ARROW}
        </a>
      </div>
    </>
  );
}

export function NotFound() {
  return (
    <main className="nf">
      <Logo size={80} />
      <h1>This page made a different move.</h1>
      <p className="nf-ctas">
        <GoMain where="404" />
        <a className="btn btn-outline" href="/">
          Go to the homepage
        </a>
      </p>
    </main>
  );
}
