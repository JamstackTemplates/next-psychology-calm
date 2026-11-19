import type { ReactNode } from 'react';
import { RangeSilhouette, Reflection } from './artwork';

type BandTone = 'sand' | 'raked-sand' | 'water' | 'surface';

const toneClasses: Record<BandTone, string> = {
  sand: 'lake-sky',
  'raked-sand': 'band-raked-sand',
  water: 'lake-sky',
  surface: 'bg-surface',
};

const titleType =
  'font-display text-[clamp(3rem,9vw,7rem)] leading-[0.92] font-light tracking-[-0.03em]';

/**
 * Inner-page head built on the lake-glass idea: the title rests on a horizon
 * and is mirrored in the water below, where the lede and route artwork sit.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  art,
  artPosition = 'beside',
  tone = 'sand',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Bespoke inline SVG artwork suited to the route. */
  art?: ReactNode;
  artPosition?: 'beside' | 'below';
  tone?: BandTone;
}) {
  const beside = Boolean(art) && artPosition === 'beside';

  return (
    <header className="relative isolate overflow-hidden">
      {/* Above the horizon */}
      <div className={`${toneClasses[tone]} relative`}>
        <RangeSilhouette className="absolute inset-x-0 bottom-0 h-[42%] w-full opacity-70" />
        <div className="wrap relative grid items-end gap-6 pt-[clamp(3rem,8vw,6rem)] lg:grid-cols-12">
          <div className={beside ? 'lg:col-span-9' : 'lg:col-span-12'}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 id={id} className={`${titleType} mt-4 mb-[-0.13em] max-w-[11em] text-ink`}>
              {title}
            </h1>
          </div>
          {beside ? (
            <div className="hidden justify-end lg:col-span-3 lg:flex">{art}</div>
          ) : null}
        </div>
      </div>

      {/* Below the horizon */}
      <div className="lake-water-plain horizon-line relative">
        <div className="wrap relative pb-[clamp(2.75rem,6vw,4.5rem)]">
          <Reflection className={`${titleType} h-[0.75em] max-w-[11em]`}>{title}</Reflection>
          {beside ? <div className="mt-2 lg:hidden">{art}</div> : null}
          {children ? (
            <div className="mt-4 max-w-(--measure) text-[clamp(1.05rem,1.45vw,1.2rem)] leading-relaxed text-ink/85">
              {children}
            </div>
          ) : null}
          {art && artPosition === 'below' ? <div className="mt-8">{art}</div> : null}
        </div>
      </div>
    </header>
  );
}
