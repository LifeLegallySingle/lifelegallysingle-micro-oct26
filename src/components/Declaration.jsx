import { useEffect, useId, useRef, useState } from 'react';
import { PILLARS } from '../content.js';
import { SITE, MAIN, LOGO, mainUrl } from '../site.config.js';
import { Logo } from './Logo.jsx';

const W = 1080;
const H = 1350;
const C = { night: '#0e0a1a', plum: '#1d1236', royal: '#6427b0', lavender: '#a98bf0', lilac: '#d6c8ff', paper: '#ffffff', mist: '#b7aecb' };
const SANS = '"Inter Tight Variable", "Inter Tight", "Helvetica Neue", Arial, sans-serif';
const HAND = '"Caveat Variable", Caveat, cursive';

function wrap(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function loadLogo() {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = LOGO.src;
  });
}

function drawLogoMark(ctx, x, y, s) {
  ctx.fillStyle = '#000';
  ctx.fillRect(x, y, s, s);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = `800 ${s * 0.34}px ${SANS}`;
  ctx.fillText('LIFE', x + s / 2, y + s * 0.48);
  ctx.textAlign = 'left';
  ctx.font = `700 ${s * 0.125}px ${SANS}`;
  ctx.fillText('Legally', x + s * 0.09, y + s * 0.64);
  ctx.fillText('Single', x + s * 0.54, y + s * 0.64);
  ctx.fillRect(x + s * 0.53, y + s * 0.6, s * 0.39, Math.max(1, s * 0.014));
  ctx.fillStyle = C.lavender;
  ctx.font = `600 ${s * 0.15}px ${HAND}`;
  ctx.fillText('stronger', x + s * 0.56, y + s * 0.8);
}

async function renderCard(name, picks) {
  await Promise.all([
    document.fonts.load(`800 96px ${SANS}`),
    document.fonts.load(`500 30px ${SANS}`),
    document.fonts.load(`600 60px ${HAND}`),
  ]).catch(() => {});
  const logo = await loadLogo();
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, C.plum);
  bg.addColorStop(1, C.night);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.9, H * 0.05, 40, W * 0.9, H * 0.05, 820);
  glow.addColorStop(0, 'rgba(100,39,176,0.65)');
  glow.addColorStop(1, 'rgba(100,39,176,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // concentric rings, as on legallysingle.com
  ctx.strokeStyle = 'rgba(169,139,240,0.16)';
  ctx.lineWidth = 2;
  for (const r of [260, 380, 500]) {
    ctx.beginPath();
    ctx.arc(W - 40, 120, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const x = 96;
  const max = W - 192;
  let y = 96;

  // logo, or the drawn mark if the logo can't be used on a canvas
  let drew = false;
  if (logo) {
    try {
      ctx.drawImage(logo, x, y, 120, 120);
      ctx.getImageData(0, 0, 1, 1); // throws if the canvas is tainted
      drew = true;
    } catch {
      ctx.fillStyle = C.plum;
      ctx.fillRect(x, y, 120, 120);
    }
  }
  if (!drew) drawLogoMark(ctx, x, y, 120);

  y += 200;
  ctx.textAlign = 'left';
  ctx.fillStyle = C.lilac;
  ctx.font = `600 34px ${SANS}`;
  ctx.fillText(`I, ${name.trim() || 'the undersigned'}, declare:`, x, y);

  y += 12;
  ctx.fillStyle = C.paper;
  ctx.font = `800 104px ${SANS}`;
  for (const l of wrap(ctx, `${SITE.tagline}™`, max)) {
    y += 104;
    ctx.fillText(l, x, y);
  }

  y += 80;
  ctx.fillStyle = C.lavender;
  ctx.font = `700 26px ${SANS}`;
  ctx.fillText('MY NEXT POWER MOVES', x, y);
  y += 14;

  for (const p of PILLARS) {
    const move = p.moves[picks[p.id]];
    y += 52;
    ctx.fillStyle = C.lilac;
    ctx.font = `700 30px ${SANS}`;
    ctx.fillText(`${p.icon} ${p.name}`, x, y);
    ctx.fillStyle = C.paper;
    ctx.font = `500 30px ${SANS}`;
    const lines = wrap(ctx, move, max - 210);
    lines.forEach((l, i) => ctx.fillText(l, x + 210, y + i * 38));
    y += (lines.length - 1) * 38;
  }

  const sy = H - 150;
  ctx.fillStyle = C.paper;
  ctx.font = `600 72px ${HAND}`;
  ctx.fillText(name.trim() || ' ', x, sy - 14);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillRect(x, sy, 460, 2);
  ctx.fillStyle = C.mist;
  ctx.font = `500 24px ${SANS}`;
  ctx.fillText('Signed, by choice', x, sy + 40);

  ctx.fillStyle = C.lavender;
  ctx.font = `700 28px ${SANS}`;
  ctx.textAlign = 'right';
  ctx.fillText('lifelegallysingle.com', W - 96, sy + 40);

  return new Promise((res) => cv.toBlob(res, 'image/png'));
}

export function Declaration({ focus }) {
  const uid = useId();
  const [name, setName] = useState('');
  const [picks, setPicks] = useState(() => Object.fromEntries(PILLARS.map((p) => [p.id, 0])));
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const refs = useRef({});

  // When a pillar is picked in the hero orbit, bring it into view and flash it.
  useEffect(() => {
    if (!focus?.id) return;
    const el = refs.current[focus.id];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.querySelector('input:checked')?.focus({ preventScroll: true });
    el.classList.remove('flash');
    void el.offsetWidth; // restart the highlight animation
    el.classList.add('flash');
  }, [focus]);

  async function saveOrShare(mode) {
    setBusy(true);
    setNote('');
    try {
      const blob = await renderCard(name, picks);
      const file = new File([blob], 'my-power-move-declaration.png', { type: 'image/png' });
      if (mode === 'share' && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: SITE.tagline,
          text: `${SITE.tagline}. Write yours at lifelegallysingle.com`,
        });
        setNote('Shared.');
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        setNote('Saved to your downloads.');
      }
    } catch (err) {
      if (err?.name !== 'AbortError') setNote('Couldn’t create the image. Try Save image instead.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="decl">
      <div className="decl-controls">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Your first name</label>
          <input
            id={`${uid}-name`}
            type="text"
            maxLength={28}
            autoComplete="given-name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="hint">Stays on your device. Nothing is sent anywhere.</p>
        </div>

        {PILLARS.map((p) => (
          <fieldset
            key={p.id}
            id={`pillar-${p.id}`}
            ref={(el) => (refs.current[p.id] = el)}
            className={`pillar${focus?.id === p.id ? ' is-focus' : ''}`}
          >
            <legend>
              <span className="pillar-name">
                <span aria-hidden="true">{p.icon}</span> {p.name}
              </span>
              <span className="pillar-line">{p.line}</span>
            </legend>
            <div className="chips">
              {p.moves.map((m, i) => (
                <label key={i} className="chip">
                  <input
                    type="radio"
                    name={`${uid}-${p.id}`}
                    checked={picks[p.id] === i}
                    onChange={() => setPicks((s) => ({ ...s, [p.id]: i }))}
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>
            <a className="pillar-link" href={mainUrl(MAIN.paths.pillars[p.id], `pillar-${p.id}`)}>
              More {p.name} moves on legallysingle.com
            </a>
          </fieldset>
        ))}
      </div>

      <figure className="decl-doc" aria-label="Preview of your declaration">
        <div className="decl-sheet">
          <div className="decl-top">
            <Logo size={64} className="decl-logo" />
            <span className="decl-kicker">Official declaration</span>
          </div>
          <p className="decl-intro">
            I, <span className="decl-name">{name.trim() || 'the undersigned'}</span>, declare:
          </p>
          <p className="decl-tagline">
            {SITE.tagline}
            <sup>™</sup>
          </p>
          <p className="decl-moves-head">My next Power Moves</p>
          <dl className="decl-moves">
            {PILLARS.map((p) => (
              <div key={p.id}>
                <dt>
                  <span aria-hidden="true">{p.icon}</span> {p.name}
                </dt>
                <dd key={picks[p.id]} className="swap">
                  {p.moves[picks[p.id]]}
                </dd>
              </div>
            ))}
          </dl>
          <div className="decl-sign">
            <span className="decl-sig">{name.trim()}</span>
            <span className="decl-sig-line" />
            <span className="decl-sig-cap">Signed, by choice</span>
          </div>
        </div>
        <figcaption className="decl-actions">
          <button type="button" className="btn btn-primary" disabled={busy} onClick={() => saveOrShare('share')}>
            {busy ? 'Creating image…' : 'Share my declaration'}
          </button>
          <button type="button" className="btn btn-ghost" disabled={busy} onClick={() => saveOrShare('save')}>
            Save image
          </button>
          <span className="decl-note" role="status" aria-live="polite">
            {note}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
