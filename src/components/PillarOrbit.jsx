import { useState } from 'react';
import { PILLARS } from '../content.js';
import { Logo } from './Logo.jsx';

// Interactive hero visual: the five pillars orbit the logo.
// Hover or focus pauses the orbit; choosing a pillar jumps to the declaration.
export function PillarOrbit({ active, onPick }) {
  const [hover, setHover] = useState(null);
  const [inside, setInside] = useState(false); // stop the orbit as soon as the pointer arrives
  const shown = PILLARS.find((p) => p.id === (hover ?? active));

  return (
    <div
      className="orbit"
      data-paused={hover || inside ? '' : undefined}
      onPointerEnter={() => setInside(true)}
      onPointerLeave={() => setInside(false)}
    >
      <div className="orbit-ring orbit-ring-1" aria-hidden="true" />
      <div className="orbit-ring orbit-ring-2" aria-hidden="true" />
      <div className="orbit-core">
        <Logo size={132} className="orbit-logo" />
      </div>
      <ul className="orbit-track" aria-label="Choose a pillar to start your declaration">
        {PILLARS.map((p, i) => (
          <li key={p.id} className="orbit-slot" style={{ '--i': i }}>
            <span className="orbit-counter">
            <button
              type="button"
              className="orbit-node"
              aria-pressed={active === p.id}
              onPointerEnter={() => setHover(p.id)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(p.id)}
              onBlur={() => setHover(null)}
              onClick={() => onPick(p.id)}
            >
              <span aria-hidden="true">{p.icon}</span>
              {p.name}
            </button>
            </span>
          </li>
        ))}
      </ul>
      <p className="orbit-caption" aria-live="polite">
        {shown ? (
          <>
            <strong>{shown.name}.</strong> {shown.line}
          </>
        ) : (
          'Pick a pillar to start your declaration.'
        )}
      </p>
    </div>
  );
}
