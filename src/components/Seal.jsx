// The gold notary-style seal: the one animated moment on the page.
export function Seal({ className = '' }) {
  const ring = 'LIFE LEGALLY SINGLE ✦ SELF-PARTNERED ✦ EST. BY CHOICE ✦ ';
  return (
    <div className={`seal ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="seal-svg">
        <defs>
          <path id="sealPath" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          <radialGradient id="sealFill" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#ffe48a" />
            <stop offset="55%" stopColor="#f5c842" />
            <stop offset="100%" stopColor="#b88a17" />
          </radialGradient>
        </defs>
        <g className="seal-scallop">
          {Array.from({ length: 36 }, (_, i) => (
            <circle
              key={i}
              cx={100 + 92 * Math.cos((i / 36) * 2 * Math.PI)}
              cy={100 + 92 * Math.sin((i / 36) * 2 * Math.PI)}
              r="9"
              fill="url(#sealFill)"
            />
          ))}
          <circle cx="100" cy="100" r="92" fill="url(#sealFill)" />
        </g>
        <circle cx="100" cy="100" r="86" fill="none" stroke="#6427b0" strokeWidth="1.5" />
        <g className="seal-ring">
          <text className="seal-ring-text">
            <textPath href="#sealPath" startOffset="0">
              {ring}
            </textPath>
          </text>
        </g>
        <circle cx="100" cy="100" r="58" fill="#6427b0" />
        <circle cx="100" cy="100" r="53" fill="none" stroke="#f5c842" strokeWidth="1" />
        <text x="100" y="112" textAnchor="middle" className="seal-mono">
          LLS
        </text>
        <text x="100" y="134" textAnchor="middle" className="seal-sub">
          power move
        </text>
      </svg>
    </div>
  );
}
