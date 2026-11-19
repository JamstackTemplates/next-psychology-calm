import { business } from '../content/business';
import { RippleMark, Shoreline, StoneCairn } from './artwork';
import { LampIcon, MailIcon, PhoneIcon } from './icons';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="relative lake-water-plain text-ink">
      <Shoreline above="var(--bg)" below="color-mix(in srgb, var(--water) 72%, var(--sky-horizon))" variant={1} />

      <div className="wrap py-14 sm:py-16">
        {/* Top row: cairn + wordmark + details */}
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <StoneCairn className="h-14 w-16 shrink-0" />
              <div>
                <SiteLink href="/" className="inline-flex items-center gap-2 no-underline hover:no-underline">
                  <RippleMark className="h-5 w-7 shrink-0" />
                  <span className="font-display text-2xl italic text-ink">{business.wordmark.primary}</span>
                  <span className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-ink/75">
                    {business.wordmark.secondary}
                  </span>
                </SiteLink>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">
                  {business.locationNote}
                </p>
                <p className="mt-3 text-sm font-medium text-ink">
                  {business.address.formatted}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-ink/70">Reception &amp; sessions</p>
            <dl className="mt-3 space-y-1.5 text-sm">
              {business.hoursSummary.map(row => (
                <div key={row.days} className="flex justify-between gap-4 border-b border-line pb-1.5">
                  <dt className="font-medium text-ink/85">{row.days}</dt>
                  <dd className="text-ink/80">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3">
              <OpenBadge hours={business.hours} />
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-ink/70">Contact</p>
            <ul className="mt-3 list-none space-y-2.5 p-0 text-sm">
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 break-all text-ink underline decoration-ink/40 hover:decoration-ink"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  <span>{business.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="inline-flex items-center gap-2 text-ink underline decoration-ink/40 hover:decoration-ink"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  <span>{business.phone}</span>
                </a>
              </li>
            </ul>

            <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <SiteLink href="/approaches/" className="text-ink/85 hover:text-ink hover:underline">Approaches</SiteLink>
              <SiteLink href="/clinicians/" className="text-ink/85 hover:text-ink hover:underline">Clinicians</SiteLink>
              <SiteLink href="/fees/" className="text-ink/85 hover:text-ink hover:underline">Fees &amp; rebates</SiteLink>
              <SiteLink href="/contact/" className="text-ink/85 hover:text-ink hover:underline">Contact</SiteLink>
              <SiteLink href="/urgent-help/" className="font-semibold text-clay hover:underline">Urgent help</SiteLink>
            </nav>
          </div>
        </div>

        {/* One-line crisis note on every page */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-ink">
            <LampIcon className="h-4 w-4 shrink-0 text-clay" />
            <span>
              Not an emergency service. In an emergency call{' '}
              <a href="tel:000" className="font-semibold underline">000</a>
              {' · '}Lifeline{' '}
              <a href="tel:131114" className="font-semibold underline">13 11 14</a>
            </span>
          </p>
          <SiteLink href="/urgent-help/" className="font-semibold text-ink underline decoration-ink/50 hover:decoration-ink">
            All urgent support lines
          </SiteLink>
        </div>

        {/* Acknowledgement of Country & credit */}
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-6 text-xs text-ink/75">
          <p className="max-w-2xl leading-relaxed">{business.acknowledgement}</p>
          <span title="Made with care on jamstacks.net">
            Built with{' '}
            <a className="underline decoration-ink/40 hover:decoration-ink" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
