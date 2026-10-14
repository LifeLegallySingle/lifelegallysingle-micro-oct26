import { useId, useState } from 'react';
import { PILLARS } from '../content.js';
import { SITE, MAIN, mainUrl } from '../site.config.js';

const W = 1080;
const H = 1350;
const C = { ink: '#080808', royal: '#6427b0', gilt: '#f5c842', paper: '#efe9f7', mist: '#a69cb6' };
const SERIF = '"Bodoni Moda Variable", "Bodoni Moda", Didot, Georgia, serif';
const SANS = '"Archivo Variable", Archivo, "Helvetica Neue", Arial, sans-serif';

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

function drawSeal(ctx, cx, cy, r) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.14);
  const g = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r * 1.1);
  g.addColorStop(0, '#ffe48a');
  g.addColorStop(0.55, C.gilt);
  g.addColorStop(1, '#b88a17');
  ctx.fillStyle = g;
  for (let i = 0; i < 36; i++) {
    const t = (i / 36) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(r * Math.cos(t), r * Math.sin(t), r * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = C.royal;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.64, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = C.gilt;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = C.gilt;
  ctx.textAlign = 'center';
  ctx.font = `800 ${Math.round(r * 0.42)}px ${SERIF}`;
  ctx.fillText('LLS', 0, r * 0.12);
  ctx.fillStyle = C.paper;
  ctx.font = `italic 500 ${Math.round(r * 0.14)}px ${SERIF}`;
  ctx.fillText('power move', 0, r * 0.36);
  ctx.restore();
}

async function renderCard(name, picks) {
  await Promise.all([
    document.fonts.load(`700 96px ${SERIF}`),
    document.fonts.load(`italic 500 48px ${SERIF}`),
    document.fonts.load(`500 30px ${SANS}`),
  ]).catch(() => {});
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext('2d');

  ctx.fillStyle = C.ink;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.85, H * 0.1, 40, W * 0.85, H * 0.1, 900);
  glow.addColorStop(0, 'rgba(100,39,176,0.55)');
  glow.addColorStop(1, 'rgba(100,39,176,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Certificate double rule
  ctx.strokeStyle = C.gilt;
  ctx.lineWidth = 3;
  ctx.strokeRect(44, 44, W - 88, H - 88);
  ctx.lineWidth = 1;
  ctx.strokeRect(58, 58, W - 116, H - 116);

  const x = 110;
  const max = W - 220;
  let y = 170;

  ctx.fillStyle = C.gilt;
  ctx.font = `italic 500 44px ${SERIF}`;
  ctx.fillText('A declaration', x, y);

  y += 76;
  ctx.fillStyle = C.paper;
  ctx.font = `400 36px ${SERIF}`;
  ctx.fillText(`I, ${name.trim() || 'the undersigned'}, declare that`, x, y);

  y += 40;
  ctx.font = `800 100px ${SERIF}`;
  for (const l of wrap(ctx, `${SITE.tagline}.`, max)) {
    y += 104;
    ctx.fillText(l, x, y);
  }

  y += 84;
  ctx.fillStyle = C.gilt;
  ctx.font = `600 30px ${SANS}`;
  ctx.fillText('My next moves', x, y);
  y += 18;

  for (const p of PILLARS) {
    const move = p.moves[picks[p.id]];
    y += 50;
    ctx.fillStyle = C.gilt;
    ctx.font = `600 28px ${SANS}`;
    ctx.fillText(p.name, x, y);
    ctx.fillStyle = C.paper;
    ctx.font = `400 28px ${SANS}`;
    const lines = wrap(ctx, move, max - 150);
    lines.forEach((l, i) => ctx.fillText(l, x + 150, y + i * 36));
    y += (lines.length - 1) * 36;
  }

  drawSeal(ctx, W - 230, H - 330, 105);

  // Signature
  const sy = H - 170;
  ctx.strokeStyle = C.mist;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, sy);
  ctx.lineTo(x + 520, sy);
  ctx.stroke();
  ctx.fillStyle = C.paper;
  ctx.font = `italic 500 52px ${SERIF}`;
  ctx.fillText(name.trim() || ' ', x + 8, sy - 16);
  ctx.fillStyle = C.mist;
  ctx.font = `400 24px ${SANS}`;
  ctx.fillText('Signed, by choice', x, sy + 38);

  ctx.fillStyle = C.gilt;
  ctx.font = `600 26px ${SANS}`;
  ctx.textAlign = 'right';
  ctx.fillText('lifelegallysingle.com', W - 110, sy + 38);

  return new Promise((res) => cv.toBlob(res, 'image/png'));
}

export function Declaration() {
  const uid = useId();
  const [name, setName] = useState('');
  const [picks, setPicks] = useState(() => Object.fromEntries(PILLARS.map((p) => [p.id, 0])));
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

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
          <fieldset key={p.id} className="pillar">
            <legend>
              <span className="pillar-name">{p.name}</span>
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
          <p className="decl-title">A declaration</p>
          <p className="decl-intro">
            I, <span className="decl-name">{name.trim() || 'the undersigned'}</span>, declare that
          </p>
          <p className="decl-tagline">{SITE.tagline}.</p>
          <p className="decl-moves-head">My next moves</p>
          <dl className="decl-moves">
            {PILLARS.map((p) => (
              <div key={p.id}>
                <dt>{p.name}</dt>
                <dd>{p.moves[picks[p.id]]}</dd>
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
          <button type="button" className="btn btn-gold" disabled={busy} onClick={() => saveOrShare('share')}>
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
