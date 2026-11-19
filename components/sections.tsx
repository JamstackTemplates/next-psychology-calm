import type { ReactNode } from 'react';
import type { Approach } from '../content/approaches';
import { business } from '../content/business';
import { availabilityLabel, type Clinician } from '../content/clinicians';
import type { CrisisLine } from '../content/crisis';
import { formatAud, lowestStandardFee, medicareLabel, type FeeItem } from '../content/fees';
import { mapDirectionsUrl } from '../lib/maps';
import {
  ApproachGlyph,
  ForeshoreMap,
  HeroJetty,
  HeroReeds,
  LakesideLamp,
  LostPathArt,
  PebbleMonogram,
  RangeSilhouette,
  Reflection,
  SkipRipple,
  SteppingStone,
  StoneCairn,
  WaterlineDivider,
} from './artwork';
import { AccessIcon, ClockIcon, LampIcon, LocationIcon, MailIcon, PhoneIcon } from './icons';
import { OpenBadge } from './open-badge';
import { SettleRipple } from './settle-ripple';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type ChildrenProps = { children: ReactNode };

/* ==========================================================================
   1. Home Hero — Asymmetric 5/7 on desktop, lake + ripple + headline + CTA first on 390px
   ========================================================================== */

export function HomeHero({
  headline,
  primaryAction,
  subline,
  secondaryAction,
  availabilitySummary,
}: {
  headline: ReactNode;
  primaryAction: ReactNode;
  subline: ReactNode;
  secondaryAction: ReactNode;
  availabilitySummary: string;
}) {
  const headlineType =
    'font-display text-[clamp(3.9rem,16.5vw,8.75rem)] leading-[0.9] font-light tracking-[-0.03em] max-w-[5.2em] sm:max-w-[8.2em]';

  return (
    <section className="hero-horizon relative isolate overflow-hidden">
      {/* Sky: first light over the Brindabellas, with the headline resting on the horizon */}
      <div className="lake-sky relative">
        <RangeSilhouette className="absolute inset-x-0 bottom-0 h-[38%] w-full sm:h-[46%]" />
        <HeroJetty className="absolute right-[-5rem] bottom-[-3.5rem] z-10 w-[14rem] sm:right-[-3rem] sm:bottom-[-4.6rem] sm:w-[22rem] lg:w-[24rem]" />
        <div className="wrap relative z-20 pt-[clamp(3.5rem,10vh,7rem)] pb-0">
          <h1 className={`${headlineType} mb-[-0.14em] text-ink`}>{headline}</h1>
        </div>
      </div>

      {/* Water: the headline mirrored, the Settle Ripple floating, the way in */}
      <div className="lake-water horizon-line relative">
        <HeroReeds className="absolute right-0 bottom-0 h-40 w-20 -scale-x-100 sm:h-[62%] sm:w-40" />
        <div className="wrap relative z-10 grid pb-14 lg:grid-cols-12 lg:pb-20">
          <div className="lg:col-span-7">
            <Reflection className={`${headlineType} h-[0.8em] sm:h-[1.05em]`}>
              {headline}
            </Reflection>

            <div className="-mt-[0.4rem] flex flex-wrap items-center gap-x-7 gap-y-3 sm:mt-0">
              <SiteLink href="/contact/" className="button button-lg">
                {primaryAction}
              </SiteLink>
              <SiteLink href="/clinicians/" className="text-link hidden text-base font-semibold text-ink sm:inline">
                {secondaryAction}
              </SiteLink>
            </div>
          </div>

          <div className="mt-4 flex justify-center sm:justify-end lg:col-span-5 lg:-mt-12 lg:justify-start">
            <SettleRipple variant="hero" />
          </div>

          <div className="mt-8 max-w-[38ch] lg:col-span-7 lg:mt-10">
            <p className="text-[1.0625rem] leading-relaxed text-ink/85 sm:text-[1.1875rem]">{subline}</p>
            <div className="mt-5 flex flex-col items-start gap-2.5">
              <SiteLink href="/clinicians/" className="text-link text-[0.95rem] font-semibold text-ink sm:hidden">
                {secondaryAction}
              </SiteLink>
              <p className="inline-flex items-center gap-2 text-sm text-ink/80">
                <span className="inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>{availabilitySummary}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   2. What it's like here — Typographic staggered stones on --surface
   ========================================================================== */

function QualitiesSection({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <section className="bg-surface">
      <div className="wrap py-16 sm:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-12 space-y-14 sm:mt-16 sm:space-y-24">{children}</div>
      </div>
    </section>
  );
}

function QualityStone({
  step,
  phrase,
  children,
}: {
  step: 0 | 1 | 2;
  phrase: ReactNode;
  children: ReactNode;
}) {
  // Each phrase lands further across the water, like a skimmed stone losing pace
  const offsets = ['md:ml-0', 'md:ml-[16%]', 'md:ml-[32%]'];
  return (
    <div className={`relative max-w-[46rem] ${offsets[step]}`}>
      <SkipRipple
        strength={step}
        className="absolute top-[0.55em] -left-2 hidden h-6 w-20 -translate-x-full md:block"
      />
      <h2 className="font-display text-[clamp(2.3rem,5.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.02em] italic text-ink">
        {phrase}
      </h2>
      <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted sm:text-[1.0625rem]">{children}</p>
    </div>
  );
}

export const PracticeQualities = Object.assign(QualitiesSection, { Item: QualityStone });

/* ==========================================================================
   3. Ways of working — Full-bleed --water band with 7 approach glyphs along shoreline
   ========================================================================== */

export function ShorelineApproaches({
  eyebrow,
  heading,
  intro,
  ctaLabel,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: string;
  items: readonly Approach[];
}) {
  // Stones of varied size, all resting on one flat waterline (still water is level)
  const glyphSizes = [
    'h-[5.6rem] w-[6.9rem]',
    'h-[7rem] w-[8.6rem]',
    'h-[5.2rem] w-[6.4rem]',
    'h-[6.6rem] w-[8.1rem]',
    'h-[5.4rem] w-[6.6rem]',
    'h-[7.4rem] w-[9.1rem]',
    'h-[6rem] w-[7.4rem]',
  ];

  return (
    <section className="lake-water-plain pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-ink/75">{eyebrow}</p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1] font-light tracking-[-0.02em] text-ink">
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-base leading-relaxed text-ink/85 sm:text-[1.0625rem]">{intro}</p>
            <SiteLink href="/approaches/" className="text-link mt-3 inline-block font-semibold text-ink">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>

      {/* Seven stones on the waterline, each mirrored beneath; scrolls sideways on small screens */}
      <ul className="mx-auto mt-14 flex w-full max-w-[96rem] snap-x snap-mandatory list-none overflow-x-auto p-0 px-[max(1.125rem,calc((100%-76rem)/2))] pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
        {items.map((approach, index) => (
          <li key={approach.id} className="w-44 shrink-0 snap-start lg:w-auto">
            <SiteLink
              href={`/approaches/#${approach.id}`}
              className="pebble-lift group flex flex-col items-center text-center no-underline hover:no-underline"
            >
              <span className="flex h-32 w-full items-end justify-center border-b border-ink/30 lg:h-36">
                <ApproachGlyph glyph={approach.glyph} className={`-mb-2 ${glyphSizes[index % glyphSizes.length]}`} />
              </span>
              <Reflection className="h-16 w-full">
                <span className="flex justify-center">
                  <ApproachGlyph glyph={approach.glyph} className={glyphSizes[index % glyphSizes.length]} />
                </span>
              </Reflection>
              <span className="mt-1 max-w-[11ch] font-display text-[1.2rem] leading-snug text-ink group-hover:underline">
                {approach.name}
              </span>
            </SiteLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ==========================================================================
   4. Who you'd be talking to — Diagonal stepping-stone path on --bg sand
   ========================================================================== */

export function SteppingClinicians({
  eyebrow,
  heading,
  intro,
  ctaLabel,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: string;
  items: readonly Clinician[];
}) {
  const pathPositions = [
    'lg:col-start-1 lg:col-span-6',
    'lg:col-start-6 lg:col-span-6',
    'lg:col-start-2 lg:col-span-6',
    'lg:col-start-7 lg:col-span-6',
  ];

  return (
    <section className="bg-bg py-16 sm:py-24">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1] font-light tracking-[-0.02em] text-ink">
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-base leading-relaxed text-muted sm:text-[1.0625rem]">{intro}</p>
            <SiteLink href="/clinicians/" className="text-link mt-3 inline-block font-semibold">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>

        {/* Diagonal stepping-stone path across 12 columns, joined by a faint wading line */}
        <div className="relative mt-14">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="art-hide-print pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            aria-hidden="true"
          >
            <path
              d="M6 10 C30 12, 40 30, 50 36 C58 41, 20 50, 14 62 C10 70, 40 80, 58 88"
              fill="none"
              stroke="var(--sage)"
              strokeWidth="1.4"
              strokeDasharray="2 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="relative grid list-none gap-y-10 p-0 lg:grid-cols-12 lg:gap-y-8">
            {items.map((clinician, index) => (
              <li key={clinician.id} className={pathPositions[index % pathPositions.length]}>
                <SiteLink
                  href={`/clinicians/#${clinician.id}`}
                  className="pebble-lift group flex items-center gap-5 no-underline hover:no-underline sm:gap-7"
                >
                  <PebbleMonogram
                    pebble={clinician.pebble}
                    botanical={clinician.botanical}
                    initials={clinician.initials}
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.75rem] leading-tight font-light text-ink group-hover:underline sm:text-[2rem]">
                      {clinician.name}
                    </h3>
                    <p className="eyebrow mt-1 text-primary-ink">{clinician.roleLabel}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{clinician.focus.join(', ')}</p>
                    <span className="status-pill mt-3" data-status={clinician.availability}>
                      <span className="status-dot" aria-hidden="true" />
                      <span>{availabilityLabel(clinician.availability)}</span>
                    </span>
                  </div>
                </SiteLink>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   5. Fees, plainly — Raked sand band with ruled tide table + oversized "from $X"
   ========================================================================== */

export function RakedFeesPreview({
  eyebrow,
  heading,
  fromNote,
  ctaLabel,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  fromNote: ReactNode;
  ctaLabel: string;
  items: readonly FeeItem[];
}) {
  const lowest = lowestStandardFee(items);

  return (
    <section className="band-raked-sand py-16 sm:py-24">
      <div className="wrap">
        <p className="eyebrow text-ink/75">{eyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1] font-light tracking-[-0.02em] text-ink">
          {heading}
        </h2>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          {/* Offset-left ruled tide table panel */}
          <div className="border-t-2 border-b-2 border-ink/70 bg-surface/90 px-6 py-5 sm:px-8 sm:py-7 lg:col-span-7">
            <ul className="m-0 list-none divide-y divide-line p-0">
              {items.map(item => (
                <li
                  key={item.id}
                  className="grid gap-1.5 py-4 first:pt-1 last:pb-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-6"
                >
                  <div>
                    <p className="font-display text-xl text-ink">
                      {item.label}{' '}
                      <span className="font-sans text-xs font-medium tracking-wide text-muted">
                        · {item.minutes} min
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      {item.id === 'fit-call' ? item.note : medicareLabel(item.medicare)}
                    </p>
                  </div>
                  <p className="font-display text-2xl text-ink sm:text-right">
                    {formatAud(item.price)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Oversized Newsreader numeral at right */}
          <div className="flex flex-col items-start justify-center lg:col-span-5 lg:pl-10">
            <p className="eyebrow text-ink/75">Standard 50-minute session</p>
            <p className="mt-2 font-display leading-[0.85] font-light tracking-[-0.03em] text-ink">
              <span className="mb-3 block text-[clamp(2rem,3.6vw,3rem)] leading-none italic">from</span>
              <span className="block text-[clamp(5.5rem,13vw,11rem)]">${lowest}</span>
            </p>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/80">{fromNote}</p>
            <SiteLink href="/fees/" className="button button-quiet mt-7">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. How to begin — Four numbered stepping stones across water on --surface
   ========================================================================== */

function BeginSection({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="wrap">
        <div className="flex flex-wrap items-end gap-5">
          <StoneCairn className="h-20 w-24 shrink-0" />
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1] font-light tracking-[-0.02em] text-ink">
              {heading}
            </h2>
          </div>
        </div>

        <div className="relative mt-14">
          {/* A strip of water the stones cross: vertical on phones, full-bleed horizontal on desktop */}
          <div
            className="water-strip pointer-events-none absolute top-0 bottom-0 left-2 w-24 rounded-full lg:top-0 lg:right-[calc(50%-50vw)] lg:bottom-auto lg:left-[calc(50%-50vw)] lg:h-28 lg:w-auto lg:rounded-none"
            aria-hidden="true"
          />
          <ol className="relative m-0 grid list-none gap-10 p-0 lg:grid-cols-4 lg:gap-8">
            {children}
          </ol>
        </div>
      </div>
    </section>
  );
}

function BeginStep({
  number,
  title,
  children,
}: {
  number: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-5 lg:flex-col lg:gap-6">
      <span className="flex h-28 w-28 shrink-0 items-center justify-center lg:w-auto lg:justify-start">
        <SteppingStone index={Number(number) - 1} label={number} className="h-20 w-28" />
      </span>
      <div className="pt-4 lg:pt-0">
        <h3 className="font-display text-[1.6rem] leading-tight font-normal text-ink">{title}</h3>
        <p className="mt-2 max-w-[36ch] text-[0.95rem] leading-relaxed text-muted">{children}</p>
      </div>
    </li>
  );
}

export const BeginSteps = Object.assign(BeginSection, { Step: BeginStep });

/* ==========================================================================
   7. If you need help now — Full-bleed deep ink / dusk band with LakesideLamp
   ========================================================================== */

export function CrisisBand({
  eyebrow,
  heading,
  note,
  moreLabel,
}: {
  eyebrow: string;
  heading: ReactNode;
  note: ReactNode;
  moreLabel: string;
}) {
  return (
    <section aria-labelledby="home-crisis-heading" className="night-water text-crisis-fg">
      <div className="wrap grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-12">
        <div className="flex items-end gap-6 lg:col-span-6">
          <LakesideLamp onDark className="h-44 w-32 shrink-0 sm:h-64 sm:w-48" />
          <div className="pb-4">
            <p className="eyebrow text-crisis-muted">{eyebrow}</p>
            <h2
              id="home-crisis-heading"
              className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] font-light tracking-[-0.02em] text-crisis-fg"
            >
              {heading}
            </h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-crisis-muted">{note}</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-10">
          <dl className="m-0 grid gap-y-6">
            <div className="border-b border-crisis-line pb-5">
              <dt className="eyebrow text-crisis-muted">Emergency</dt>
              <dd className="m-0">
                <a
                  href="tel:000"
                  className="inline-block font-display text-[clamp(4.5rem,10vw,8rem)] leading-[0.95] font-light tracking-[-0.02em] text-crisis-accent underline decoration-crisis-accent/40 decoration-1 underline-offset-[0.12em] hover:decoration-crisis-accent"
                >
                  000
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-crisis-muted">Lifeline (24/7)</dt>
              <dd className="m-0">
                <a
                  href="tel:131114"
                  className="inline-block font-display text-[clamp(3rem,6.4vw,5.25rem)] leading-[1] font-light tracking-[-0.02em] text-crisis-fg underline decoration-crisis-fg/40 decoration-1 underline-offset-[0.14em] hover:decoration-crisis-fg"
                >
                  13 11 14
                </a>
              </dd>
            </div>
          </dl>
          <SiteLink
            href="/urgent-help/"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-crisis-fg underline decoration-crisis-fg/50 hover:decoration-crisis-fg"
          >
            <span>{moreLabel}</span>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   8. Find us — Illustrated foreshore map at left, details/hours/CTAs at right
   ========================================================================== */

export function FindUsBand({
  eyebrow,
  heading,
  directionsLabel,
  enquireLabel,
}: {
  eyebrow: string;
  heading: ReactNode;
  directionsLabel: string;
  enquireLabel: string;
}) {
  return (
    <section className="bg-bg py-16 sm:py-24">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ForeshoreMap />
          <p className="mt-3 text-xs text-muted">
            Illustrated shoreline guide — {business.landmark}, {business.address.addressLocality}.
          </p>
        </div>

        <div className="lg:col-span-6 lg:pl-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[1] font-light tracking-[-0.02em] text-ink">
            {heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{business.locationNote}</p>

          <p className="mt-5 flex items-start gap-2.5 text-base font-semibold text-ink">
            <LocationIcon className="mt-1 h-4 w-4 shrink-0 text-clay" />
            <span>{business.address.formatted}</span>
          </p>

          <ul className="mt-4 list-none space-y-2 p-0 text-sm text-muted">
            {business.accessNotes.map(note => (
              <li key={note} className="flex items-start gap-2.5">
                <AccessIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          {/* Reception hours (neutral static copy + live browser-only OpenBadge) */}
          <div className="mt-7 border-t border-line pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow flex items-center gap-2 text-ink/80">
                <ClockIcon className="h-4 w-4 text-primary-ink" />
                <span>Reception &amp; session hours</span>
              </p>
              <OpenBadge hours={business.hours} />
            </div>

            <dl className="mt-3 grid max-w-md grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {business.hoursSummary.map(row => (
                <div key={row.days} className="contents">
                  <dt className="font-medium text-ink">{row.days}</dt>
                  <dd className="text-muted">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <TimeZoneNote />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SiteLink href="/contact/" className="button">
              {enquireLabel}
            </SiteLink>
            <a
              href={mapDirectionsUrl(business.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-quiet"
            >
              {directionsLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Approaches page alternating rows & A minute to settle band
   ========================================================================== */

export function ApproachRows({
  approaches,
  clinicians,
}: {
  approaches: readonly Approach[];
  clinicians: readonly Clinician[];
}) {
  return (
    <section className="bg-bg">
      <div className="wrap divide-y divide-transparent">
        {approaches.map((approach, index) => {
          const reversed = index % 2 === 1;
          const offeredBy = clinicians.filter(c => c.approaches.includes(approach.id));

          return (
            <div key={approach.id}>
              <article
                id={approach.id}
                className="grid scroll-mt-24 items-start gap-8 py-14 sm:py-20 lg:grid-cols-12"
              >
                {/* Large stone glyph alternating left / right */}
                <div
                  className={`flex items-center lg:col-span-4 ${
                    reversed ? 'lg:order-2 lg:justify-end' : 'lg:order-1 lg:justify-start'
                  }`}
                >
                  <ApproachGlyph
                    glyph={approach.glyph}
                    className="h-28 w-36 sm:h-36 sm:w-44"
                  />
                </div>

                {/* Plain-language content */}
                <div className={`lg:col-span-8 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.12] font-light text-ink">
                    {approach.name}
                  </h2>
                  <p className="mt-4 max-w-(--measure) text-base leading-relaxed text-ink/90">
                    {approach.description}
                  </p>

                  {/* What a session feels like — indented Newsreader italic aside */}
                  <aside className="mt-6 max-w-(--measure) border-l-2 border-sage pl-5">
                    <p className="eyebrow text-primary-ink">What a session feels like</p>
                    <p className="mt-1.5 font-display text-xl leading-relaxed italic text-ink/90">
                      {approach.sessionFeelsLike}
                    </p>
                  </aside>

                  {/* Often suits — ripple bullets */}
                  <div className="mt-7 max-w-(--measure)">
                    <p className="eyebrow">Often suits</p>
                    <ul className="ripple-list mt-3 space-y-2 text-[0.95rem] text-muted">
                      {approach.oftenSuits.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Offered by — mini pebble chips linked to clinician profiles */}
                  <div className="mt-7">
                    <p className="eyebrow">Offered by</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {offeredBy.map(clinician => (
                        <SiteLink
                          key={clinician.id}
                          href={`/clinicians/#${clinician.id}`}
                          className="pebble-lift inline-flex items-center gap-2 rounded-full border border-line-solid bg-surface py-1 pr-4 pl-2 text-sm font-medium text-ink no-underline hover:border-primary-ink hover:no-underline"
                        >
                          <PebbleMonogram
                            pebble={clinician.pebble}
                            botanical={clinician.botanical}
                            initials={clinician.initials}
                            size="sm"
                          />
                          <span>{clinician.name}</span>
                        </SiteLink>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              {index < approaches.length - 1 ? <WaterlineDivider /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SettleBand({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="bg-water py-16 sm:py-24">
      <div className="wrap-narrow text-center">
        <p className="eyebrow text-ink/75">{eyebrow}</p>
        <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.15rem)] leading-[1.12] font-light text-ink">
          {heading}
        </h2>
        <div className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/80">{children}</div>
        <div className="mt-8">
          <SettleRipple variant="full" />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Shared inner-page elements: PageCta, CrisisStrip, UrgentList, NotFoundScene
   ========================================================================== */

export function PageCta({
  eyebrow,
  heading,
  body,
  actionLabel,
  href = '/contact/',
  tone = 'surface',
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  actionLabel: string;
  href?: string;
  tone?: 'surface' | 'sand';
}) {
  return (
    <section className={tone === 'surface' ? 'bg-surface border-t border-line' : 'bg-bg border-t border-line'}>
      <div className="wrap flex flex-wrap items-center justify-between gap-8 py-14 sm:py-20">
        <div className="max-w-xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="mt-1 font-display text-[clamp(1.85rem,3.6vw,2.75rem)] leading-[1.15] font-light text-ink">
            {heading}
          </h2>
          {body ? <p className="mt-3 text-base leading-relaxed text-muted">{body}</p> : null}
        </div>
        <SiteLink href={href} className="button">
          {actionLabel}
        </SiteLink>
      </div>
    </section>
  );
}

/** Lamp-marked calm crisis strip placed above the Contact form. */
export function CrisisStrip({ children }: ChildrenProps) {
  return (
    <aside
      aria-label="Urgent help notice"
      className="border-b border-line bg-crisis-bg text-crisis-fg"
    >
      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-4 text-sm sm:text-[0.95rem]">
        <div className="flex items-start gap-3">
          <LampIcon className="mt-0.5 h-5 w-5 shrink-0 text-crisis-accent" />
          <p className="leading-relaxed">{children}</p>
        </div>
        <SiteLink
          href="/urgent-help/"
          className="shrink-0 font-semibold text-crisis-accent underline decoration-crisis-accent/50 hover:decoration-crisis-accent"
        >
          Urgent help &amp; 24/7 lines
        </SiteLink>
      </div>
    </aside>
  );
}

/** Clean, scannable vertical list of crisis & support lines on /urgent-help/. */
export function UrgentSupportList({ lines }: { lines: readonly CrisisLine[] }) {
  return (
    <ul className="m-0 list-none divide-y divide-line border-t border-b border-line p-0">
      {lines.map(line => (
        <li
          key={line.id}
          className="grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
        >
          <div className="sm:col-span-5">
            <h2 className="font-display text-2xl font-normal text-ink">{line.name}</h2>
            <p className="mt-1 text-sm text-muted">{line.forWho}</p>
          </div>

          <div className="sm:col-span-4">
            <a
              href={`tel:${line.tel}`}
              className="font-display text-3xl font-light text-primary-ink underline decoration-primary-ink/40 hover:decoration-primary-ink sm:text-[2.15rem]"
            >
              {line.number}
            </a>
            {line.textNumber && line.textTel ? (
              <p className="mt-1 text-sm text-muted">
                Text:{' '}
                <a href={`sms:${line.textTel}`} className="text-link font-medium">
                  {line.textNumber}
                </a>
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-3 sm:flex-col sm:items-end">
            <span className="eyebrow text-ink/80">{line.hours}</span>
            <a
              href={line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-sm"
            >
              Website
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** 404 Stepping Stones scene ending at an empty ripple. */
export function NotFoundScene({
  heading,
  body,
  homeLabel,
  urgentLabel,
}: {
  heading: ReactNode;
  body: ReactNode;
  homeLabel: string;
  urgentLabel: string;
}) {
  return (
    <section className="wrap py-16 sm:py-24">
      <LostPathArt className="w-full" />
      <div className="mt-10 max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.08] font-light italic text-ink">
          {heading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{body}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <SiteLink href="/" className="button">
            {homeLabel}
          </SiteLink>
          <SiteLink href="/urgent-help/" className="button button-quiet">
            {urgentLabel}
          </SiteLink>
        </div>
        <p className="mt-8 border-t border-line pt-5 text-sm text-muted">
          If you need immediate support, call{' '}
          <a href="tel:000" className="text-link font-semibold">000</a> or Lifeline on{' '}
          <a href="tel:131114" className="text-link font-semibold">13 11 14</a>.
        </p>
      </div>
    </section>
  );
}

/** Reusable contact detail block used on Contact page sidebar. */
export function DirectContactBlock({
  copyControl,
}: {
  copyControl: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="eyebrow text-ink/80">Direct email &amp; phone</h2>
        <div className="mt-3 space-y-3">
          <p>
            <a
              href={`mailto:${business.email}`}
              className="text-link inline-flex items-center gap-2 break-all text-base font-medium"
            >
              <MailIcon className="h-4 w-4 shrink-0" />
              <span>{business.email}</span>
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-3">{copyControl}</div>
          <p className="pt-1">
            <a
              href={`tel:${business.phoneTel}`}
              className="text-link inline-flex items-center gap-2 text-base font-medium"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              <span>{business.phone}</span>
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-line pt-5">
        <h2 className="eyebrow text-ink/80">Where we are</h2>
        <p className="mt-2.5 flex items-start gap-2 text-sm font-medium text-ink">
          <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
          <span>{business.address.formatted}</span>
        </p>
        <p className="mt-1.5 text-sm text-muted">{business.locationNote}</p>
        <p className="mt-2.5">
          <a
            href={mapDirectionsUrl(business.mapQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-sm font-semibold"
          >
            Get directions
          </a>
        </p>
      </div>

      <div className="border-t border-line pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="eyebrow text-ink/80">Reception hours</h2>
          <OpenBadge hours={business.hours} />
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          {business.hoursSummary.map(row => (
            <div key={row.days} className="contents">
              <dt className="font-medium text-ink">{row.days}</dt>
              <dd className="text-muted">{row.hours}</dd>
            </div>
          ))}
        </dl>
        <TimeZoneNote />
      </div>
    </div>
  );
}
