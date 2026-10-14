import { useRef, useState } from 'react';
import { BREVO } from '../site.config.js';

// Posts the same fields as Brevo's own embed (EMAIL, email_address_check, locale)
// to your existing Brevo form endpoint: same list, same double opt-in, same automations.
// Submits into a hidden iframe, so it works without CORS and even with JavaScript off.
export function BrevoSignup({ id = 'brevo' }) {
  const [state, setState] = useState('idle'); // idle | sending | sent | unconfigured
  const pending = useRef(false);
  const configured = Boolean(BREVO.action);
  const sink = `${id}-sink`;

  return (
    <form
      className="signup"
      action={configured ? BREVO.action : undefined}
      method="POST"
      target={sink}
      onSubmit={(e) => {
        if (!configured) {
          e.preventDefault();
          setState('unconfigured');
          return;
        }
        pending.current = true;
        setState('sending');
      }}
    >
      {BREVO.extraFields.map((f) => (
        <div className="field" key={f.name}>
          <label htmlFor={`${id}-${f.name}`}>{f.label}</label>
          <input
            id={`${id}-${f.name}`}
            name={f.name}
            type={f.type || 'text'}
            autoComplete={f.autoComplete}
            required={f.required}
          />
        </div>
      ))}
      <div className="field field-email">
        <label htmlFor={`${id}-EMAIL`}>Email address</label>
        <div className="field-row">
          <input
            id={`${id}-EMAIL`}
            name="EMAIL"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            disabled={state === 'sent'}
          />
          <button type="submit" className="btn btn-primary" disabled={state === 'sending' || state === 'sent'}>
            {state === 'sending' ? 'Subscribing…' : state === 'sent' ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>
      {/* Brevo honeypot + locale, same as the official embed */}
      <input type="text" name="email_address_check" defaultValue="" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="locale" value={BREVO.locale} />
      <p className="signup-status" role="status" aria-live="polite">
        {state === 'sent' && BREVO.successMessage}
        {state === 'unconfigured' && 'Signup isn’t connected yet: add your Brevo form URL in src/site.config.js.'}
      </p>
      <iframe
        name={sink}
        title="Newsletter signup response"
        className="hp"
        tabIndex={-1}
        onLoad={() => {
          if (pending.current) {
            pending.current = false;
            setState('sent');
          }
        }}
      />
    </form>
  );
}
