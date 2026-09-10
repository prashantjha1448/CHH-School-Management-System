import React from 'react';
import { SCHOOL_INFO } from '../../constant/globalVariables';

/**
 * Children's Happy Home Official Logo Component
 * Pixel-perfect SVG reproduction matching official school emblem & header logo.
 * Refactored to use centralized global variables.
 */
const Logo = ({ variant = 'full', className = '', height = 38 }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* ---------------- CREST EMBLEM SVG ---------------- */}
      <svg
        width={height}
        height={height}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md"
      >
        <defs>
          {/* Top Arc for "CHILDREN'S HAPPY HOME" */}
          <path
            id="topTextArc"
            d="M 54 150 A 96 96 0 0 1 246 150"
            fill="none"
          />

          {/* Bottom Arc for "★ KATIHAR ★" */}
          <path
            id="bottomTextArc"
            d="M 246 150 A 96 96 0 0 1 54 150"
            fill="none"
          />

          {/* Ribbon Arc for "KNOWLEDGE IS POWER" */}
          <path
            id="ribbonTextArc"
            d="M 65 244 Q 150 262 235 244"
            fill="none"
          />

          {/* Gradients */}
          <linearGradient id="flameGrad" x1="150" y1="65" x2="150" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF3300" />
            <stop offset="50%" stopColor="#FF8800" />
            <stop offset="100%" stopColor="#FFCC00" />
          </linearGradient>

          <linearGradient id="innerFlameGrad" x1="150" y1="75" x2="150" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFF00" />
            <stop offset="100%" stopColor="#FF9900" />
          </linearGradient>

          <linearGradient id="sunburstBg" x1="150" y1="78" x2="150" y2="222" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF9DF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* 1. Outer Deep Blue Border Circle */}
        <circle cx="150" cy="150" r="148" fill="#00359E" />

        {/* 2. Outer Yellow Ring */}
        <circle cx="150" cy="150" r="144" fill="#FFC700" stroke="#00359E" strokeWidth="2" />

        {/* 10 Red 5-Pointed Stars around Yellow Ring */}
        {[
          { angle: -90 },
          { angle: -54 },
          { angle: -18 },
          { angle: 18 },
          { angle: 54 },
          { angle: 90 },
          { angle: 126 },
          { angle: 162 },
          { angle: 198 },
          { angle: 234 },
        ].map((s, idx) => {
          const r = 129;
          const rad = (s.angle * Math.PI) / 180;
          const cx = 150 + r * Math.cos(rad);
          const cy = 150 + r * Math.sin(rad);
          return (
            <g key={idx} transform={`translate(${cx}, ${cy}) rotate(${s.angle + 90})`}>
              <polygon
                points="0,-9 2.6,-2.7 9,-2.7 3.8,1.2 5.8,7.6 0,3.6 -5.8,7.6 -3.8,1.2 -9,-2.7 -2.6,-2.7"
                fill="#DC0000"
              />
            </g>
          );
        })}

        {/* 3. Middle Deep Blue Ring */}
        <circle cx="150" cy="150" r="114" fill="#0043C6" stroke="#002D8B" strokeWidth="2" />

        {/* Curved Top Text: CHILDREN'S HAPPY HOME */}
        <text fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1.2">
          <textPath href="#topTextArc" startOffset="50%" textAnchor="middle">
            {SCHOOL_INFO.NAME.toUpperCase()}
          </textPath>
        </text>

        {/* Curved Bottom Text: KATIHAR */}
        <text fill="#FFFFFF" fontSize="14" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="2">
          <textPath href="#bottomTextArc" startOffset="50%" textAnchor="middle">
            ★ KATIHAR ★
          </textPath>
        </text>

        {/* 4. Inner White Circle */}
        <circle cx="150" cy="150" r="78" fill="url(#sunburstBg)" stroke="#0043C6" strokeWidth="3" />

        {/* Sunburst Rays Background */}
        <g opacity="0.3">
          {Array.from({ length: 24 }).map((_, idx) => {
            const angle = idx * 15;
            const rad = (angle * Math.PI) / 180;
            const x2 = 150 + 78 * Math.cos(rad);
            const y2 = 150 + 78 * Math.sin(rad);
            return (
              <line key={idx} x1="150" y1="150" x2={x2} y2={y2} stroke="#FFA500" strokeWidth="1.5" />
            );
          })}
        </g>

        {/* Laurel Leaves */}
        <g stroke="#0043C6" fill="#0043C6" opacity="0.85">
          <path d="M 96 142 C 90 132 82 135 88 126 C 82 118 92 118 95 110" fill="none" strokeWidth="2" />
          <ellipse cx="88" cy="138" rx="4" ry="2" transform="rotate(-30 88 138)" />
          <ellipse cx="90" cy="126" rx="4" ry="2" transform="rotate(-20 90 126)" />
          <ellipse cx="94" cy="116" rx="4" ry="2" transform="rotate(-10 94 116)" />

          <path d="M 204 142 C 210 132 218 135 212 126 C 218 118 208 118 205 110" fill="none" strokeWidth="2" />
          <ellipse cx="212" cy="138" rx="4" ry="2" transform="rotate(30 212 138)" />
          <ellipse cx="210" cy="126" rx="4" ry="2" transform="rotate(20 210 126)" />
          <ellipse cx="206" cy="116" rx="4" ry="2" transform="rotate(10 206 116)" />
        </g>

        {/* 5. Central Diya & Flame */}
        <path
          d="M 150 62 C 137 86 134 104 150 118 C 166 104 163 86 150 62 Z"
          fill="url(#flameGrad)"
        />
        <path
          d="M 150 78 C 143 92 142 104 150 112 C 158 104 157 92 150 78 Z"
          fill="url(#innerFlameGrad)"
        />

        {/* Diya Bowl & Stand */}
        <path
          d="M 104 124 C 104 152 196 152 196 124 C 190 136 110 136 104 124 Z"
          fill="#0043C6"
          stroke="#002575"
          strokeWidth="2"
        />
        <path
          d="M 112 126 C 122 138 178 138 188 126"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <path
          d="M 128 144 L 172 144 L 178 155 L 122 155 Z"
          fill="#0043C6"
          stroke="#002575"
          strokeWidth="1.5"
        />

        {/* 6. Ribbon Banner at Bottom */}
        <path
          d="M 40 220 L 72 236 L 56 256 L 96 248 Q 150 268 204 248 L 244 256 L 228 236 L 260 220 L 235 240 L 65 240 Z"
          fill="#002C8A"
        />
        <path
          d="M 45 228 Q 150 252 255 228 L 244 252 Q 150 274 56 252 Z"
          fill="#00359E"
          stroke="#002575"
          strokeWidth="2"
        />
        <path
          d="M 52 232 Q 150 254 248 232 L 240 248 Q 150 268 60 248 Z"
          fill="#0043C6"
        />

        {/* Ribbon Text: KNOWLEDGE IS POWER */}
        <text fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1.5">
          <textPath href="#ribbonTextArc" startOffset="50%" textAnchor="middle">
            {SCHOOL_INFO.MOTTO.toUpperCase()}
          </textPath>
        </text>
      </svg>

      {/* ---------------- RIGHT HEADER TEXT LAYOUT ---------------- */}
      {variant === 'full' && (
        <div className="flex flex-col justify-center font-sans tracking-tight">
          {/* Top Line: ESTD 1972 & Affiliation No */}
          <div className="flex items-center justify-between gap-3 text-[10px] sm:text-[11px] font-extrabold text-brand-text-dark leading-none mb-0.5">
            <span>E.S.T.D. {SCHOOL_INFO.ESTABLISHED_YEAR}</span>
            <span>Affiliation No. {SCHOOL_INFO.CBSE_AFFILIATION_NO}</span>
          </div>

          {/* Middle Line: School Name */}
          <h1 className="text-base sm:text-lg md:text-xl font-black text-brand-crest-blue tracking-tight leading-none my-0.5 uppercase">
            {SCHOOL_INFO.NAME}
          </h1>

          {/* Bottom Line: Affiliation Level */}
          <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-brand-text-dark leading-none mt-0.5">
            Affiliated to CBSE New Delhi, Up to (10+2) Level
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;