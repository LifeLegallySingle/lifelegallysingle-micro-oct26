import { useEffect, useRef, useState } from 'react';
import { LOGO } from '../site.config.js';

// Inline fallback that mirrors the official mark, used only if the logo file can't load.
export function LogoMark({ size = 56, className = '' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label={LOGO.alt}>
      <rect width="100" height="100" fill="#000" />
      <text x="50" y="48" textAnchor="middle" fill="#fff" fontFamily="'Inter Tight Variable', Arial, sans-serif" fontWeight="800" fontSize="34" letterSpacing="-1">
        LIFE
      </text>
      <text x="9" y="64" fill="#fff" fontFamily="'Inter Tight Variable', Arial, sans-serif" fontWeight="700" fontSize="12.5">
        Legally
      </text>
      <text x="54" y="64" fill="#fff" fontFamily="'Inter Tight Variable', Arial, sans-serif" fontWeight="700" fontSize="12.5" textDecoration="line-through">
        Single
      </text>
      <line x1="53" y1="60" x2="92" y2="60" stroke="#fff" strokeWidth="1.4" />
      <text x="56" y="80" fill="#a98bf0" fontFamily="'Caveat Variable', cursive" fontWeight="600" fontSize="15">
        stronger
      </text>
    </svg>
  );
}

export function Logo({ size = 56, className = '' }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  // The image may fail before React hydrates (onError never fires), so check on mount too.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) return <LogoMark size={size} className={className} />;
  return (
    <img
      ref={ref}
      src={LOGO.src}
      alt={LOGO.alt}
      width={size}
      height={size}
      className={className}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
