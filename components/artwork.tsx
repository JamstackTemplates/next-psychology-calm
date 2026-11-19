import type { ReactNode } from 'react';
import type { ApproachGlyphId } from '../content/approaches';
import type { BotanicalMotifId, PebbleShapeId } from '../content/clinicians';

/** Small concentric ripple mark paired with the Still Waters wordmark. */
export function RippleMark({ className = 'h-7 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 42 30" className={className} aria-hidden="true">
      <ellipse cx="21" cy="18" rx="18" ry="7.4" fill="none" stroke="var(--sage)" strokeWidth="1.25" opacity="0.65" />
      <ellipse cx="21" cy="18" rx="12" ry="4.9" fill="none" stroke="var(--ink)" strokeWidth="1.25" opacity="0.55" />
      <ellipse cx="21" cy="18" rx="6.6" ry="2.7" fill="none" stroke="var(--ink)" strokeWidth="1.25" opacity="0.72" />
      <path
        d="M16.8 16.9c0-2.5 1.8-4.3 4.3-4.3 2.4 0 4.1 1.7 4.1 3.9 0 2-1.8 3.2-4.2 3.2-2.3 0-4.2-1-4.2-2.8Z"
        fill="var(--primary)"
      />
      <path d="M18.6 15.3c.7-.9 2-1.4 3.2-1.1" fill="none" stroke="var(--on-primary)" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

/** Hand-wavering waterline divider with reeds and a quiet concentric ripple. */
export function WaterlineDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`art-hide-print w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 44" preserveAspectRatio="none" className="block h-9 w-full">
        <path
          d="M0 24 C160 20, 310 28, 490 24 C670 20, 820 27, 990 23 C1070 21, 1140 25, 1200 24"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.28"
        />
        <g transform="translate(860, 24)" fill="none" stroke="var(--sage)" strokeWidth="1.2">
          <ellipse cx="0" cy="0" rx="34" ry="8" opacity="0.55" />
          <ellipse cx="0" cy="0" rx="18" ry="4.2" opacity="0.8" />
          <circle cx="0" cy="0" r="2.2" fill="var(--clay)" stroke="none" opacity="0.75" />
        </g>
        <g stroke="var(--reed)" strokeWidth="1.25" strokeLinecap="round" fill="none" opacity="0.62">
          <path d="M210 38 C214 25, 222 14, 232 5" />
          <path d="M222 39 C228 28, 236 20, 246 12" />
          <path d="M198 37 C200 28, 203 18, 207 11" />
        </g>
      </svg>
    </div>
  );
}

/** Three balanced river stones with subtle inner highlights (footer & How to begin). */
export function StoneCairn({ className = 'h-14 w-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 72" className={`art-hide-print ${className}`} aria-hidden="true">
      <ellipse cx="44" cy="63" rx="33" ry="5.5" fill="none" stroke="var(--sage)" strokeWidth="1.2" opacity="0.55" />
      <path d="M14 54 C13 42, 26 37, 45 37 C63 37, 74 43, 73 54 C72 62, 59 64, 44 64 C27 64, 15 61, 14 54 Z" fill="var(--pebble-river)" opacity="0.88" />
      <path d="M25 44 C33 41, 45 41, 54 43" fill="none" stroke="var(--pebble-ink)" strokeWidth="1.35" strokeLinecap="round" opacity="0.48" />
      <path d="M24 34 C23 25, 34 20, 46 21 C58 21, 66 26, 64 34 C63 40, 54 41, 44 41 C32 41, 24 39, 24 34 Z" fill="var(--pebble-sandstone)" opacity="0.92" />
      <path d="M33 27 C39 25, 47 25, 53 27" fill="none" stroke="var(--pebble-ink)" strokeWidth="1.25" strokeLinecap="round" opacity="0.5" />
      <path d="M34 17 C34 11, 40 8, 47 9 C54 9, 58 13, 57 18 C56 22, 50 23, 45 23 C38 23, 34 21, 34 17 Z" fill="var(--pebble-sage)" opacity="0.95" />
      <path d="M40 13.5 C43 12.2, 48 12.2, 51 13.5" fill="none" stroke="var(--pebble-ink)" strokeWidth="1.15" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/** Reeds and ripple motif for Approaches and Contact page heads. */
export function ReedsMotif({ className = 'h-16 w-44' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 76" className={`art-hide-print ${className}`} aria-hidden="true">
      <path d="M6 58 C64 54, 138 61, 214 57" fill="none" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <ellipse cx="148" cy="58" rx="34" ry="8.5" fill="none" stroke="var(--sage)" strokeWidth="1.25" opacity="0.65" />
      <ellipse cx="148" cy="58" rx="18" ry="4.5" fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity="0.52" />
      <g stroke="var(--reed)" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.82">
        <path d="M34 68 C39 46, 48 26, 62 10" />
        <path d="M48 68 C54 48, 66 32, 82 18" />
        <path d="M22 66 C24 50, 29 34, 36 20" />
        <path d="M44 54 C58 43, 72 38, 88 36" opacity="0.6" />
      </g>
      <ellipse cx="63" cy="9" rx="2.4" ry="6.8" transform="rotate(24 63 9)" fill="var(--clay)" opacity="0.78" />
      <ellipse cx="83" cy="17" rx="2.1" ry="5.8" transform="rotate(34 83 17)" fill="var(--clay)" opacity="0.68" />
    </svg>
  );
}

/** Seven engraved stone glyphs — one per therapeutic approach. */
export function ApproachGlyph({
  glyph,
  className = 'h-16 w-20',
}: {
  glyph: ApproachGlyphId;
  className?: string;
}) {
  const stonePaths: Record<ApproachGlyphId, { d: string; fill: string }> = {
    'path-fork': {
      d: 'M12 46 C10 24, 24 10, 48 11 C71 12, 86 24, 84 44 C82 62, 65 69, 44 68 C24 67, 13 60, 12 46 Z',
      fill: 'var(--pebble-sandstone)',
    },
    'open-hand': {
      d: 'M14 42 C13 22, 30 9, 51 11 C73 13, 85 27, 83 47 C81 64, 62 69, 43 68 C25 67, 15 58, 14 42 Z',
      fill: 'var(--pebble-sage)',
    },
    'nested-shell': {
      d: 'M11 45 C12 24, 27 11, 49 12 C72 13, 87 26, 85 45 C83 62, 67 68, 47 68 C25 68, 10 59, 11 45 Z',
      fill: 'var(--pebble-river)',
    },
    'side-to-side': {
      d: 'M10 43 C11 24, 26 12, 48 12 C71 12, 86 24, 86 43 C86 60, 68 68, 47 68 C26 68, 10 59, 10 43 Z',
      fill: 'var(--pebble-basalt)',
    },
    'two-stones': {
      d: 'M12 44 C11 25, 25 12, 47 11 C70 10, 85 24, 84 44 C83 62, 65 69, 45 68 C24 67, 13 59, 12 44 Z',
      fill: 'var(--pebble-sandstone)',
    },
    'winding-line': {
      d: 'M13 46 C12 24, 28 11, 50 11 C72 11, 86 25, 84 46 C82 63, 64 68, 44 68 C24 68, 14 60, 13 46 Z',
      fill: 'var(--pebble-sage)',
    },
    'single-ripple': {
      d: 'M11 44 C11 23, 27 10, 48 11 C70 12, 86 25, 85 45 C84 62, 66 68, 46 68 C26 68, 11 59, 11 44 Z',
      fill: 'var(--pebble-river)',
    },
  };

  const stone = stonePaths[glyph];

  return (
    <svg viewBox="0 0 96 78" className={`art-hide-print ${className}`} aria-hidden="true">
      {/* Subtle shadow ripple underneath stone */}
      <ellipse cx="48" cy="68" rx="34" ry="5.5" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.16" />
      {/* Smooth organic river stone — no hard outline */}
      <path d={stone.d} fill={stone.fill} opacity="0.86" />
      {/* Soft inner specular highlight */}
      <path
        d="M25 25 C34 18, 48 17, 61 20"
        fill="none"
        stroke="var(--pebble-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.32"
      />
      {/* Engraved mark */}
      <g
        fill="none"
        stroke="var(--pebble-ink)"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      >
        {glyph === 'path-fork' && (
          <>
            <path d="M48 56 V41 C48 34, 42 30, 34 25" />
            <path d="M48 41 C48 34, 54 30, 62 25" />
            <circle cx="34" cy="25" r="2.2" fill="var(--pebble-ink)" stroke="none" />
            <circle cx="62" cy="25" r="2.2" fill="var(--pebble-ink)" stroke="none" />
          </>
        )}
        {glyph === 'open-hand' && (
          <>
            <path d="M29 44 C35 51, 46 53, 58 48 C63 46, 67 42, 69 38" />
            <path d="M35 37 C41 32, 51 31, 60 35" />
            <circle cx="48" cy="27" r="2.6" opacity="0.85" />
          </>
        )}
        {glyph === 'nested-shell' && (
          <>
            <path d="M48 44 C44 44, 42 40, 44 37 C47 33, 54 34, 56 39 C58 45, 52 51, 45 50 C36 49, 32 41, 35 33 C39 24, 51 22, 60 27" />
          </>
        )}
        {glyph === 'side-to-side' && (
          <>
            <path d="M28 40 C34 32, 42 32, 48 40 C54 48, 62 48, 68 40" />
            <circle cx="28" cy="40" r="2.4" fill="var(--pebble-ink)" stroke="none" />
            <circle cx="68" cy="40" r="2.4" fill="var(--pebble-ink)" stroke="none" />
          </>
        )}
        {glyph === 'two-stones' && (
          <>
            <ellipse cx="38" cy="40" rx="8.5" ry="6.2" />
            <ellipse cx="58" cy="42" rx="7.2" ry="5.2" />
            <path d="M27 51 C39 55, 57 55, 69 51" opacity="0.7" />
          </>
        )}
        {glyph === 'winding-line' && (
          <path d="M27 51 C33 44, 44 46, 48 40 C52 34, 43 30, 50 25 C56 21, 63 23, 68 27" />
        )}
        {glyph === 'single-ripple' && (
          <>
            <ellipse cx="48" cy="41" rx="18" ry="8.5" opacity="0.6" />
            <ellipse cx="48" cy="41" rx="11" ry="5.2" opacity="0.85" />
            <circle cx="48" cy="41" r="2.5" fill="var(--pebble-ink)" stroke="none" />
          </>
        )}
      </g>
    </svg>
  );
}

/** Clinician pebble monogram: distinct silhouette + engraved initials + tiny botanical. */
export function PebbleMonogram({
  pebble,
  botanical,
  initials,
  size = 'md',
  className = '',
}: {
  pebble: PebbleShapeId;
  botanical: BotanicalMotifId;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: 'h-9 w-11',
    md: 'h-20 w-24',
    lg: 'h-24 w-28 sm:h-28 sm:w-32',
  };

  const shapes: Record<PebbleShapeId, { d: string; fill: string; highlight: string }> = {
    basalt: {
      d: 'M14 54 C11 32, 26 14, 52 13 C79 12, 97 26, 95 49 C93 70, 74 79, 50 78 C27 77, 16 69, 14 54 Z',
      fill: 'var(--pebble-basalt)',
      highlight: 'M29 28 C41 20, 58 19, 72 23',
    },
    'river-grey': {
      d: 'M12 49 C14 27, 32 13, 56 14 C80 15, 96 31, 93 53 C90 71, 69 78, 47 77 C24 76, 11 65, 12 49 Z',
      fill: 'var(--pebble-river)',
      highlight: 'M28 29 C38 22, 55 21, 69 25',
    },
    sandstone: {
      d: 'M15 51 C13 30, 29 14, 54 15 C78 16, 95 28, 94 49 C93 69, 75 78, 52 78 C28 78, 17 67, 15 51 Z',
      fill: 'var(--pebble-sandstone)',
      highlight: 'M30 29 C42 22, 58 22, 70 26',
    },
    'sage-green': {
      d: 'M13 48 C14 26, 28 13, 53 13 C77 13, 96 28, 95 50 C94 69, 73 79, 49 78 C26 77, 12 65, 13 48 Z',
      fill: 'var(--pebble-sage)',
      highlight: 'M27 28 C40 20, 57 19, 71 24',
    },
  };

  const shape = shapes[pebble];

  return (
    <svg viewBox="0 0 112 92" className={`art-hide-print shrink-0 ${sizes[size]} ${className}`} aria-hidden="true">
      {/* Subtle shoreline ring */}
      <ellipse cx="54" cy="79" rx="37" ry="6" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.16" />
      {/* Smooth pebble */}
      <path d={shape.d} fill={shape.fill} />
      {/* Soft inner highlight */}
      <path d={shape.highlight} fill="none" stroke="var(--pebble-ink)" strokeWidth="2.4" strokeLinecap="round" opacity="0.34" />
      {/* Engraved Newsreader initials */}
      <text
        x="53"
        y="53"
        textAnchor="middle"
        fill="var(--pebble-ink)"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: size === 'sm' ? '26px' : '25px',
          fontWeight: 380,
          letterSpacing: '0.06em',
        }}
      >
        {initials}
      </text>

      {/* Tiny bespoke botanical tucked at edge (omitted at tiny chip size for crispness) */}
      {size !== 'sm' && (
        <g stroke="var(--ink)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.72">
          {botanical === 'river-fern' && (
            <g transform="translate(82, 16)">
              <path d="M4 34 C9 22, 13 12, 16 2" />
              <path d="M6 26 L14 23 M8 20 L16 17 M11 14 L18 11 M13 8 L18 6" />
              <path d="M6 24 L0 21 M9 18 L3 15 M11 12 L6 9" />
            </g>
          )}
          {botanical === 'gum-leaf' && (
            <g transform="translate(82, 14)">
              <path d="M6 34 C11 22, 16 14, 19 4" />
              <path d="M11 22 C18 16, 22 10, 20 4 C14 7, 10 14, 11 22 Z" fill="var(--sage)" fillOpacity="0.45" />
            </g>
          )}
          {botanical === 'wattle-sprig' && (
            <g transform="translate(80, 15)">
              <path d="M6 34 C11 22, 16 14, 21 5" />
              <circle cx="14" cy="18" r="2.7" fill="var(--lamp-glow)" stroke="none" opacity="0.9" />
              <circle cx="20" cy="12" r="2.5" fill="var(--lamp-glow)" stroke="none" opacity="0.9" />
              <circle cx="17" cy="6" r="2.2" fill="var(--lamp-glow)" stroke="none" opacity="0.88" />
            </g>
          )}
          {botanical === 'reed' && (
            <g transform="translate(84, 12)">
              <path d="M4 38 C7 24, 12 13, 17 2" />
              <path d="M8 38 C12 27, 16 18, 21 10" opacity="0.7" />
              <ellipse cx="17.5" cy="4" rx="2" ry="5.5" transform="rotate(20 17.5 4)" fill="var(--clay)" stroke="none" opacity="0.82" />
            </g>
          )}
        </g>
      )}
    </svg>
  );
}

/** Steady, warm lit lakeside lamp on a timber post at the water's edge. */
export function LakesideLamp({
  className = 'h-36 w-28',
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const postStroke = onDark ? 'var(--crisis-fg)' : 'var(--ink)';
  const waterStroke = onDark ? 'var(--crisis-muted)' : 'var(--sage)';
  return (
    <svg viewBox="0 0 140 180" className={`art-hide-print ${className}`} aria-hidden="true">
      {/* Warm lantern glow halos */}
      <circle cx="70" cy="58" r="46" fill="var(--lamp-glow)" opacity={onDark ? 0.22 : 0.25} />
      <circle cx="70" cy="58" r="26" fill="var(--lamp-glow)" opacity={onDark ? 0.36 : 0.42} />
      <circle cx="70" cy="58" r="12" fill="var(--lamp-core)" opacity="0.92" />

      {/* Lantern hood and glass cage */}
      <g stroke={postStroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85">
        <path d="M54 44 L70 33 L86 44 Z" fill={postStroke} fillOpacity="0.16" />
        <path d="M58 44 L61 72 H79 L82 44" />
        <line x1="70" y1="44" x2="70" y2="72" opacity="0.45" />
        <path d="M56 72 H84" />
        {/* Timber post */}
        <line x1="70" y1="72" x2="70" y2="146" strokeWidth="2.2" />
        <path d="M62 84 H78" opacity="0.65" />
      </g>

      {/* Waterline & warm lamplight reflection */}
      <path d="M12 146 C44 143, 94 149, 128 145" fill="none" stroke={waterStroke} strokeWidth="1.2" opacity="0.55" />
      <g stroke="var(--lamp-glow)" strokeLinecap="round" opacity={onDark ? 0.65 : 0.55}>
        <line x1="54" y1="154" x2="86" y2="154" strokeWidth="2.2" />
        <line x1="48" y1="162" x2="92" y2="162" strokeWidth="1.7" />
        <line x1="58" y1="170" x2="82" y2="170" strokeWidth="1.3" />
      </g>

      {/* Quiet shoreline reeds */}
      <g stroke={waterStroke} strokeWidth="1.25" strokeLinecap="round" fill="none" opacity="0.65">
        <path d="M26 156 C29 135, 34 120, 42 106" />
        <path d="M36 157 C41 140, 47 128, 54 118" />
      </g>
    </svg>
  );
}

/** 404 Stepping Stones crossing open water and ending at an empty ripple. */
export function LostPathArt({ className = 'w-full max-w-4xl' }: { className?: string }) {
  return (
    <svg viewBox="0 0 840 160" className={`art-hide-print ${className}`} aria-hidden="true">
      {/* Calm horizontal water surface */}
      <path d="M0 92 C190 86, 420 98, 630 90 C720 87, 780 93, 840 91" fill="none" stroke="var(--ink)" strokeWidth="1.15" opacity="0.25" />
      <path d="M20 124 C230 120, 460 128, 820 122" fill="none" stroke="var(--sage)" strokeWidth="1.1" opacity="0.35" />

      {/* Four stepping stones leading rightward */}
      <g>
        <path d="M48 94 C47 80, 68 74, 96 75 C124 76, 141 83, 140 94 C139 105, 118 109, 93 108 C67 107, 49 103, 48 94 Z" fill="var(--pebble-river)" opacity="0.85" />
        <path d="M68 83 C80 80, 96 80, 108 82" fill="none" stroke="var(--pebble-ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />

        <path d="M196 86 C195 74, 215 68, 240 69 C264 70, 279 76, 278 86 C277 95, 258 99, 237 98 C213 97, 197 94, 196 86 Z" fill="var(--pebble-sandstone)" opacity="0.9" />
        <path d="M214 76 C225 73, 240 73, 250 75" fill="none" stroke="var(--pebble-ink)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />

        <path d="M342 96 C341 84, 360 79, 384 80 C407 81, 421 87, 420 96 C419 105, 401 108, 380 107 C358 106, 343 103, 342 96 Z" fill="var(--pebble-sage)" opacity="0.88" />
        <path d="M359 86 C369 84, 383 84, 394 86" fill="none" stroke="var(--pebble-ink)" strokeWidth="1.35" strokeLinecap="round" opacity="0.48" />

        <path d="M484 89 C483 80, 499 76, 518 77 C536 78, 548 82, 547 89 C546 96, 532 99, 515 98 C497 97, 485 95, 484 89 Z" fill="var(--pebble-basalt)" opacity="0.82" />
      </g>

      {/* Path ends at an empty concentric ripple */}
      <g transform="translate(692, 92)" fill="none">
        <ellipse cx="0" cy="0" rx="74" ry="21" stroke="var(--sage)" strokeWidth="1.25" opacity="0.42" />
        <ellipse cx="0" cy="0" rx="50" ry="14" stroke="var(--ink)" strokeWidth="1.25" opacity="0.48" />
        <ellipse cx="0" cy="0" rx="28" ry="7.8" stroke="var(--ink)" strokeWidth="1.25" opacity="0.62" />
        <ellipse cx="0" cy="0" rx="11" ry="3.2" stroke="var(--clay)" strokeWidth="1.25" opacity="0.72" />
      </g>
    </svg>
  );
}

/** Illustrated plan of Lake Burley Griffin, Kingston Foreshore path and stone marker. */
export function ForeshoreMap({ className = 'w-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 380" className={`art-hide-print block rounded-[var(--radius-ui)] ${className}`} aria-hidden="true">
      {/* Ground sand */}
      <rect width="520" height="380" fill="var(--surface)" />
      {/* Lake Burley Griffin & Kingston Foreshore water basin */}
      <path
        d="M0 0 H520 V158 C448 164, 396 150, 340 162 C295 172, 270 214, 212 214 C156 214, 134 176, 84 170 C48 166, 22 174, 0 182 Z"
        fill="var(--water)"
        opacity="0.88"
      />
      <path
        d="M0 40 C120 34, 260 52, 520 38 V116 C390 124, 250 106, 0 118 Z"
        fill="var(--water-deep)"
        opacity="0.38"
      />

      {/* Water shimmer lines */}
      <g stroke="var(--water-sheen)" strokeWidth="1.2" strokeLinecap="round" opacity="0.58">
        <line x1="48" y1="64" x2="152" y2="64" />
        <line x1="252" y1="88" x2="386" y2="88" />
        <line x1="156" y1="142" x2="262" y2="142" />
      </g>

      {/* Lakeside walking path (dashed shoreline trail) */}
      <path
        d="M0 194 C54 184, 98 184, 140 206 C178 226, 232 232, 278 206 C322 181, 384 172, 520 174"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="2.4"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />

      {/* Eastlake Parade & nearby streets */}
      <g stroke="var(--sand-deep)" strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M0 282 C136 274, 260 256, 520 244" />
        <path d="M164 274 L178 380" />
        <path d="M372 252 L386 380" />
      </g>
      <g stroke="var(--ink)" strokeWidth="1.15" strokeLinecap="round" fill="none" opacity="0.32">
        <path d="M0 282 C136 274, 260 256, 520 244" />
        <path d="M164 274 L178 380" />
        <path d="M372 252 L386 380" />
      </g>

      {/* Practice stone marker with concentric ripples on Eastlake Parade */}
      <g transform="translate(274, 240)">
        <ellipse cx="0" cy="14" rx="34" ry="11" fill="none" stroke="var(--clay)" strokeWidth="1.25" opacity="0.4" />
        <ellipse cx="0" cy="14" rx="20" ry="6.5" fill="none" stroke="var(--clay)" strokeWidth="1.35" opacity="0.72" />
        <path
          d="M-12 7 C-12 -3, -5 -11, 0 -11 C5 -11, 12 -3, 12 7 C12 13, 6 16, 0 16 C-6 16, -12 13, -12 7 Z"
          fill="var(--clay)"
        />
        <circle cx="-2.5" cy="1" r="2.2" fill="var(--surface)" opacity="0.7" />
      </g>

      {/* Subtle shoreline reeds */}
      <g stroke="var(--reed)" strokeWidth="1.25" strokeLinecap="round" fill="none" opacity="0.65">
        <path d="M62 184 C65 168, 70 156, 76 146" />
        <path d="M72 186 C76 172, 82 162, 88 154" />
        <path d="M438 170 C442 156, 447 146, 454 137" />
      </g>

      {/* Quiet map typography */}
      <text
        x="40"
        y="92"
        fill="var(--ink)"
        opacity="0.68"
        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '18px' }}
      >
        Lake Burley Griffin
      </text>
      <text
        x="26"
        y="222"
        fill="var(--muted)"
        style={{ fontFamily: 'var(--font-sans)', fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.1em' }}
      >
        LAKE PATH
      </text>
      <text
        x="224"
        y="292"
        fill="var(--ink)"
        opacity="0.75"
        style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.09em' }}
      >
        EASTLAKE PARADE
      </text>
      <text
        x="294"
        y="224"
        fill="var(--ink)"
        style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 500 }}
      >
        Suite 3, 9 Eastlake Pde
      </text>

      {/* Simple North mark */}
      <g transform="translate(476, 44)" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.55">
        <line x1="0" y1="14" x2="0" y2="-10" />
        <path d="M-4 -4 L0 -10 L4 -4" />
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fill="var(--ink)"
          stroke="none"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600 }}
        >
          N
        </text>
      </g>
    </svg>
  );
}

/* ==========================================================================
   Lake-glass system: horizon, reflection and shoreline pieces
   ========================================================================== */

/** Pale Brindabella range silhouette, drawn to sit on a horizon (or mirrored beneath it). */
export function RangeSilhouette({
  className = '',
  mirrored = false,
}: {
  className?: string;
  mirrored?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={`art-hide-print pointer-events-none block ${mirrored ? '-scale-y-100' : ''} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 112 C90 92, 170 70, 260 78 C350 86, 410 52, 520 48 C610 45, 680 82, 780 86 C880 90, 930 60, 1040 56 C1150 52, 1230 92, 1320 96 C1380 99, 1420 90, 1440 86 V200 H0 Z"
        fill="var(--range-far)"
        opacity="0.85"
      />
      <path
        d="M0 158 C120 140, 230 132, 360 142 C480 152, 560 120, 690 124 C820 128, 900 156, 1040 150 C1170 144, 1280 128, 1440 140 V200 H0 Z"
        fill="var(--range-near)"
        opacity="0.9"
      />
      <path
        d="M0 186 C160 178, 320 182, 520 180 C760 178, 980 186, 1200 182 C1320 180, 1400 184, 1440 183 V200 H0 Z"
        fill="var(--range-near)"
      />
    </svg>
  );
}

/** Short timber jetty with its lakeside lamp, entering from the right on the hero water. */
export function HeroJetty({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 150" className={`art-hide-print pointer-events-none ${className}`} aria-hidden="true">
      {/* Lamp glow (warm, steady) */}
      <defs>
        <radialGradient id="jetty-glow">
          <stop offset="0" stopColor="var(--lamp-glow)" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="var(--lamp-glow)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--lamp-glow)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="96" cy="34" r="40" fill="url(#jetty-glow)" opacity="var(--lamp-halo-opacity)" />
      <circle cx="96" cy="34" r="3.6" fill="var(--lamp-core)" />
      <path d="M90 30 L96 23 L102 30 Z" fill="var(--ink)" opacity="0.7" />
      <line x1="96" y1="38" x2="96" y2="84" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      {/* Deck */}
      <path d="M40 86 L420 78 L420 88 L40 94 Z" fill="var(--jetty)" opacity="0.78" />
      <line x1="40" y1="86" x2="420" y2="78" stroke="var(--ink)" strokeWidth="1.25" strokeLinecap="round" opacity="0.5" />
      {/* Pilings + their reflections */}
      <g stroke="var(--jetty)" strokeWidth="3.4" strokeLinecap="round" opacity="0.82">
        <line x1="60" y1="92" x2="60" y2="104" />
        <line x1="150" y1="90" x2="150" y2="103" />
        <line x1="240" y1="88" x2="240" y2="102" />
        <line x1="330" y1="86" x2="330" y2="100" />
      </g>
      <g stroke="var(--jetty)" strokeWidth="2.4" strokeLinecap="round" opacity="0.2">
        <line x1="60" y1="108" x2="60" y2="128" />
        <line x1="150" y1="107" x2="150" y2="126" />
        <line x1="240" y1="106" x2="240" y2="124" />
        <line x1="330" y1="104" x2="330" y2="121" />
      </g>
      {/* Lamp light laid on the water */}
      <g stroke="var(--lamp-glow)" strokeLinecap="round" opacity="var(--lamp-water-opacity)">
        <line x1="82" y1="108" x2="110" y2="108" strokeWidth="2.4" />
        <line x1="76" y1="118" x2="116" y2="118" strokeWidth="1.9" />
        <line x1="84" y1="128" x2="108" y2="128" strokeWidth="1.5" />
        <line x1="90" y1="138" x2="102" y2="138" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/** Foreground reeds leaning in from the left edge of the water. */
export function HeroReeds({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 320" preserveAspectRatio="xMaxYMax meet" className={`art-hide-print pointer-events-none ${className}`} aria-hidden="true">
      <g stroke="var(--reed)" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8">
        <path d="M22 320 C30 230, 50 150, 82 70" />
        <path d="M44 320 C56 240, 84 176, 120 118" />
        <path d="M8 320 C12 250, 20 190, 30 140" />
        <path d="M66 320 C80 262, 108 214, 140 180" />
        <path d="M30 262 C52 226, 78 204, 110 192" opacity="0.6" />
      </g>
      <ellipse cx="84" cy="64" rx="3.4" ry="12" transform="rotate(20 84 64)" fill="var(--clay)" opacity="0.78" />
      <ellipse cx="122" cy="112" rx="3" ry="10" transform="rotate(30 122 112)" fill="var(--clay)" opacity="0.7" />
      <ellipse cx="31" cy="134" rx="2.6" ry="9" transform="rotate(8 31 134)" fill="var(--reed)" opacity="0.7" />
    </svg>
  );
}

/**
 * Mirror of a piece of type or art laid on still water: flipped, faintly
 * displaced and fading with depth. Always decorative (aria-hidden).
 */
export function Reflection({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`reflection-clip art-hide-print ${className}`}>
      <div className="reflection">{children}</div>
    </div>
  );
}

const SHORE_EDGES = [
  'M0 30 C180 18, 360 40, 560 30 C760 20, 980 42, 1180 30 C1300 23, 1390 30, 1440 28',
  'M0 26 C220 40, 420 16, 640 26 C860 36, 1040 18, 1240 30 C1340 36, 1410 28, 1440 26',
  'M0 34 C140 24, 320 22, 520 32 C700 41, 900 22, 1100 24 C1260 26, 1380 36, 1440 32',
];

/**
 * Soft drawn shoreline joining two bands. `above` and `below` take CSS colours
 * (usually tokens) so the transition re-tints in dark mode.
 */
export function Shoreline({
  above,
  below,
  variant = 0,
  className = '',
  children,
}: {
  above: string;
  below: string;
  variant?: 0 | 1 | 2;
  className?: string;
  children?: ReactNode;
}) {
  const edge = SHORE_EDGES[variant];
  return (
    <div aria-hidden="true" className={`art-hide-print relative ${className}`} style={{ background: above }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-9 w-full sm:h-14">
        <path d={`${edge} L1440 56 L0 56 Z`} fill={below} />
        <path
          d={edge}
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.28"
          strokeWidth="1.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="draw-line"
        />
      </svg>
      {children}
    </div>
  );
}

const STEP_STONES = [
  { d: 'M8 46 C6 28, 30 16, 62 17 C94 18, 114 30, 112 46 C110 62, 88 70, 60 69 C30 68, 10 61, 8 46 Z', fill: 'var(--pebble-river)' },
  { d: 'M10 44 C10 27, 32 15, 60 16 C90 17, 112 28, 110 45 C108 61, 86 69, 58 68 C30 67, 10 59, 10 44 Z', fill: 'var(--pebble-sandstone)' },
  { d: 'M7 45 C8 29, 28 17, 58 16 C90 15, 113 29, 112 46 C111 62, 90 70, 60 69 C28 68, 6 60, 7 45 Z', fill: 'var(--pebble-sage)' },
  { d: 'M9 46 C8 28, 30 15, 61 16 C92 17, 112 31, 111 47 C110 62, 87 69, 58 68 C29 67, 10 61, 9 46 Z', fill: 'var(--pebble-basalt)' },
];

/** A flat stepping stone half-sunk in water, engraved with its step number. */
export function SteppingStone({ index, label, className = 'h-20 w-28' }: { index: number; label: string; className?: string }) {
  const stone = STEP_STONES[index % STEP_STONES.length];
  return (
    <svg viewBox="0 0 120 84" className={className} aria-hidden="true">
      <ellipse cx="60" cy="66" rx="56" ry="12" fill="none" stroke="var(--water-sheen)" strokeWidth="1.4" opacity="0.9" />
      <ellipse cx="60" cy="68" rx="44" ry="8" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.14" />
      <path d={stone.d} fill={stone.fill} />
      <path d="M28 28 C42 21, 62 20, 80 24" fill="none" stroke="var(--pebble-ink)" strokeWidth="2.2" strokeLinecap="round" opacity="0.32" />
      <text
        x="60"
        y="54"
        textAnchor="middle"
        fill="var(--pebble-ink)"
        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '30px', fontWeight: 350 }}
      >
        {label}
      </text>
    </svg>
  );
}

/** Concentric "skip" mark where a skimmed stone touches the water; smaller with each skip. */
export function SkipRipple({ strength = 0, className = '' }: { strength?: 0 | 1 | 2; className?: string }) {
  const rings = [3, 2, 1][strength];
  return (
    <svg viewBox="0 0 80 24" className={`art-hide-print ${className}`} aria-hidden="true">
      {Array.from({ length: rings }, (_, i) => (
        <ellipse
          key={i}
          cx="40"
          cy="12"
          rx={10 + i * 13}
          ry={3 + i * 3.6}
          fill="none"
          stroke={i === 0 ? 'var(--clay)' : 'var(--sage)'}
          strokeWidth="1.25"
          opacity={0.8 - i * 0.2}
        />
      ))}
    </svg>
  );
}

/** Shared SVG filter that gives reflections a faint horizontal water wobble. */
export function LakeGlassFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <filter id="lake-glass" x="-4%" y="-10%" width="108%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.11" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="B" />
      </filter>
    </svg>
  );
}
