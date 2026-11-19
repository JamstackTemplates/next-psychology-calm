import type { Metadata } from 'next';
import { FeeScheduleTable } from '../../components/fee-schedule';
import { PageHead } from '../../components/page-head';
import { PageCta } from '../../components/sections';
import { fees, formatAud, reducedFee } from '../../content/fees';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Fees & rebates',
  description:
    'Plain session fees, Medicare rebate eligibility under a GP Mental Health Treatment Plan, private health extras, reduced-fee places and cancellation policy.',
  alternates: { canonical: absoluteUrl('/fees/') },
};

export default function FeesPage() {
  const feeById = new Map(fees.map(item => [item.id, item]));

  return (
    <>
      <PageHead
        eyebrow="Fees & rebates"
        tone="raked-sand"
        title={
          <>
            Fees, <em>plainly</em>
          </>
        }
      >
        <p>
          All fees are in Australian dollars and GST-free. We set out what each session costs and how rebates work before you get in touch, so there are no surprises.
        </p>
      </PageHead>

      {/* Full-width ruled tide table */}
      <section className="bg-bg py-14 sm:py-20">
        <div className="wrap">
          <p className="eyebrow">Session schedule</p>
          <h2 className="mt-2 mb-8 font-display text-[clamp(1.9rem,3.6vw,2.85rem)] leading-[1.12] font-light text-ink">
            Standard <em>session fees</em>
          </h2>
          <FeeScheduleTable items={fees} />
        </div>
      </section>

      {/* Medicare rebates — three stepping stones */}
      <section className="border-t border-line bg-bg py-14 sm:py-20">
        <div className="wrap">
          <div className="max-w-2xl">
            <p className="eyebrow">Medicare rebates</p>
            <h2 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,2.85rem)] leading-[1.12] font-light text-ink">
              How a GP <em>Mental Health Treatment Plan</em> works
            </h2>
          </div>

          <ol className="mt-10 grid list-none gap-6 p-0 md:grid-cols-3">
            <li className="rounded-[var(--radius-ui)] bg-surface p-6">
              <span className="inline-flex h-11 w-12 items-center justify-center rounded-[52%_48%_46%_54%/55%_45%_55%_45%] bg-water font-display text-xl italic text-ink">
                1
              </span>
              <h3 className="mt-4 font-display text-2xl font-normal text-ink">See your GP first</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Book a longer appointment with your GP to discuss whether a Mental Health Treatment Plan is appropriate for you, and bring the referral letter to your first session.
              </p>
            </li>

            <li className="rounded-[var(--radius-ui)] bg-surface p-6">
              <span className="inline-flex h-11 w-12 items-center justify-center rounded-[52%_48%_46%_54%/55%_45%_55%_45%] bg-water font-display text-xl italic text-ink">
                2
              </span>
              <h3 className="mt-4 font-display text-2xl font-normal text-ink">Up to 10 individual sessions</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Eligible clients can claim a Medicare rebate for up to 10 individual sessions per calendar year with a registered or clinical psychologist (usually starting with 6, reviewed by your GP for 4 more).
              </p>
            </li>

            <li className="rounded-[var(--radius-ui)] bg-surface p-6">
              <span className="inline-flex h-11 w-12 items-center justify-center rounded-[52%_48%_46%_54%/55%_45%_55%_45%] bg-water font-display text-xl italic text-ink">
                3
              </span>
              <h3 className="mt-4 font-display text-2xl font-normal text-ink">Claim the rebate</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Clinical psychologist sessions attract a higher Medicare rebate than psychologist sessions. We can lodge your claim on the spot after payment, or give you an itemised receipt.
              </p>
            </li>
          </ol>

          <div className="mt-8 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
            <p>
              <strong className="font-semibold text-ink">What Medicare does not cover:</strong> Counselling sessions and couples sessions are not covered by Medicare.
            </p>
            <p>
              Medicare rebate amounts are set by Services Australia and change over time, so we do not publish rebate dollar figures here. When we reply to your enquiry, we confirm the current out-of-pocket gap for the clinician you are considering.
            </p>
          </div>
        </div>
      </section>

      {/* Private health & Reduced-fee places — unequal 7/5 split */}
      <section className="border-t border-line bg-surface py-14 sm:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Private health</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.15] font-light text-ink">
              Extras cover &amp; <em>itemised receipts</em>
            </h2>
            <p className="mt-4 max-w-(--measure) text-base leading-relaxed text-muted">
              Many Australian private health extras policies include benefits for psychology, and some cover counselling depending on your fund and level of cover. Because entitlements vary by insurer, please check directly with your fund before your first appointment.
            </p>
            <p className="mt-3 max-w-(--measure) text-base leading-relaxed text-muted">
              We issue an itemised receipt after every session with provider details so you can claim online with your fund. Note that you cannot claim both Medicare and private health for the same session.
            </p>
          </div>

          <div className="rounded-[var(--radius-pebble)] bg-bg p-6 sm:p-8 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">Reduced-fee places</p>
              <span
                className="status-pill"
                data-status={reducedFee.available ? 'open' : 'closed'}
              >
                <span className="status-dot" aria-hidden="true" />
                <span>{reducedFee.available ? 'Places available' : 'Currently full'}</span>
              </span>
            </div>

            <h2 className="mt-3 font-display text-2xl font-light text-ink">
              Students &amp; concession card holders
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{reducedFee.note}</p>

            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              {reducedFee.examples.map(example => {
                const base = feeById.get(example.feeId);
                if (!base) return null;
                return (
                  <div key={example.feeId} className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink/90">{base.label}</dt>
                    <dd className="font-display text-xl text-ink">{formatAud(example.price)}</dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Availability is limited and confirmed only when we reply to your enquiry.
            </p>
          </div>
        </div>
      </section>

      {/* Cancellations and payment — quiet single-column note */}
      <section className="border-t border-line bg-bg py-14 sm:py-20">
        <div className="wrap">
          <div className="max-w-2xl">
            <p className="eyebrow">Cancellations &amp; payment</p>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.15] font-light text-ink">
              Clear notice, <em>no prepayment</em>
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Please give at least <strong className="font-semibold text-ink">48 hours’ notice</strong> if you need to reschedule or cancel an appointment, so the time can be offered to someone on the waitlist. Late cancellations or missed appointments incur the full session fee, with exceptions for sudden illness and genuine emergencies at your clinician’s discretion.
              </p>
              <p>
                Payment is by card at the end of each session (or processed by card details on file for telehealth). This website takes no online payments or deposits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Questions about cost?"
        heading={
          <>
            Ask us about your <em>current gap or reduced-fee places</em>
          </>
        }
        body="We are glad to talk through fees and rebates during your free 15-minute fit call before you decide whether to book."
        actionLabel="Make a first enquiry"
      />
    </>
  );
}
