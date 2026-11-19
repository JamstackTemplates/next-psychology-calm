import type { Metadata } from 'next';
import { ReedsMotif } from '../../components/artwork';
import { CopyEmail } from '../../components/copy-email';
import { PrivacyIcon } from '../../components/icons';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { CrisisStrip, DirectContactBlock } from '../../components/sections';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        eyebrow="Contact"
        title={
          <>
            Make a <em>first enquiry</em>
          </>
        }
        art={<ReedsMotif className="h-20 w-52" />}
      >
        <p>
          For first-appointment enquiries, questions about fit or fees, GP referrals, or waitlist requests. We reply within two business days to arrange a free 15-minute fit call.
        </p>
      </PageHead>

      {/* Lamp-marked short crisis strip placed above the form */}
      <CrisisStrip>
        This form isn’t monitored around the clock. If you need help now, call{' '}
        <a href="tel:000" className="font-semibold text-crisis-accent underline">
          000
        </a>{' '}
        or Lifeline on{' '}
        <a href="tel:131114" className="font-semibold text-crisis-fg underline">
          13 11 14
        </a>
        .
      </CrisisStrip>

      <section className="bg-bg py-12 sm:py-16">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12">
          {/* Left 7/12: Hosted form or calm email fallback on --surface */}
          <div className="rounded-[var(--radius-pebble)] bg-surface p-6 sm:p-10 lg:col-span-7">
            <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">
              Send a brief note
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We’ll reply within two business days to arrange a fit call. Your appointment is only booked once we’ve agreed a time with you.
            </p>

            <div className="mt-6">
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div className="rounded-[var(--radius-ui)] border border-line-solid bg-bg/70 p-6">
                  <h3 className="font-display text-xl text-ink">Write to us directly by email</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    The online enquiry form is not connected in this preview. Please email{' '}
                    <a className="text-link font-semibold" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>{' '}
                    or call{' '}
                    <a className="text-link font-semibold" href={`tel:${business.phoneTel}`}>
                      {business.phone}
                    </a>{' '}
                    during reception hours—it reaches the same inbox.
                  </p>
                </div>
              )}
            </div>

            {/* Privacy note */}
            <p className="mt-6 flex items-start gap-2.5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              <PrivacyIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" />
              <span>
                Please keep it brief. There’s no need to share details of what’s happening until you’re speaking with a clinician.
              </span>
            </p>
          </div>

          {/* Right 5/12: What to include + direct email/phone/address/hours */}
          <aside aria-label="What to include and contact details" className="space-y-8 lg:col-span-5">
            <div>
              <h2 className="eyebrow text-ink/80">What to include</h2>
              <p className="mt-2 text-sm text-muted">
                A few lines are plenty. If you like, mention:
              </p>
              <ul className="ripple-list mt-4 space-y-2.5 text-sm leading-relaxed text-ink/90">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-6">
              <DirectContactBlock copyControl={<CopyEmail email={business.email} />} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
