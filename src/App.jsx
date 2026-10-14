import { Seal } from './components/Seal.jsx';
import { Declaration } from './components/Declaration.jsx';
import { BrevoSignup } from './components/BrevoSignup.jsx';
import { TERMS, FAQ } from './content.js';
import { SITE, MAIN, mainUrl } from './site.config.js';

export function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="top">
        <a className="wordmark" href="/" aria-label={`${SITE.brand} home`}>
          Life Legally Single<sup>™</sup>
        </a>
        <a className="top-link" href={mainUrl(MAIN.paths.home, 'header')}>
          Visit legallysingle.com
        </a>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="tagline">
          <h1 id="tagline" className="hero-title">
            <span>Being</span> <span>Single</span> <span>is a Power</span> <span>Move.</span>
          </h1>
          <Seal className="hero-seal" />
          <div className="hero-foot">
            <p className="hero-lede">
              Not a waiting room. Not a phase. A life you build on purpose, across Mind, Body, Heart, Glow, and Wallet.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-gold" href="#declare">
                Write your declaration
              </a>
              <a className="btn btn-ghost" href={mainUrl(MAIN.paths.home, 'hero')}>
                Read the playbook
              </a>
            </div>
          </div>
        </section>

        <section id="declare" className="section declare" aria-labelledby="declare-h">
          <div className="section-head">
            <h2 id="declare-h">Make it official</h2>
            <p>Pick one Power Move for each pillar. Sign it. Share it. Then go do it.</p>
          </div>
          <Declaration />
        </section>

        <section className="section tax" aria-labelledby="tax-h">
          <h2 id="tax-h" className="tax-statement">
            The system was built for two incomes. You pay the difference.
          </h2>
          <div className="tax-body">
            <p>
              Life Legally Single™ calls it the Freedom Tax™: the compounding wealth penalty solo earners pay in
              systems built for dual-income households. Housing, insurance, taxes, and everyday pricing all add to it.
            </p>
            <a className="btn btn-gold" href={mainUrl(MAIN.paths.freedomTax, 'freedom-tax')}>
              Calculate your Freedom Tax™
            </a>
          </div>
        </section>

        <section id="vocabulary" className="section vocab" aria-labelledby="vocab-h">
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
            <p>Practical moves for your money, your health, and your life as a team of one. Unsubscribe anytime.</p>
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
        <p className="foot-line">{SITE.tagline}.</p>
        <nav aria-label="Life Legally Single">
          <a href={mainUrl(MAIN.paths.home, 'footer')}>legallysingle.com</a>
          <a href={mainUrl(MAIN.paths.freedomTax, 'footer')}>Freedom Tax™ calculator</a>
          <a href={mainUrl(MAIN.paths.privacy, 'footer')}>Privacy</a>
        </nav>
        <p className="foot-small">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.brand}. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export function NotFound() {
  return (
    <main className="nf">
      <p className="nf-code">404</p>
      <h1>This page made a different move.</h1>
      <p>
        <a className="btn btn-gold" href="/">
          Go to the homepage
        </a>{' '}
        <a className="btn btn-ghost" href={mainUrl(MAIN.paths.home, '404')}>
          Visit legallysingle.com
        </a>
      </p>
    </main>
  );
}
