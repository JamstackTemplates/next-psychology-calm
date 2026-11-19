import type { Metadata } from 'next';
import { PebbleMonogram } from '../../components/artwork';
import { ClinicianDirectory } from '../../components/clinician-directory';
import { PageHead } from '../../components/page-head';
import { PageCta } from '../../components/sections';
import { approaches } from '../../content/approaches';
import { clinicians } from '../../content/clinicians';
import { fees } from '../../content/fees';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Clinicians',
  description:
    'Meet the three psychologists and one counsellor at Still Waters Wellbeing on the Kingston Foreshore, Canberra. Filter by approach or current availability.',
  alternates: { canonical: absoluteUrl('/clinicians/') },
};

export default function CliniciansPage() {
  return (
    <>
      <PageHead
        eyebrow="Clinicians"
        title={
          <>
            The people you’d be <em>talking to</em>
          </>
        }
        artPosition="below"
        art={
          <div className="flex flex-wrap items-end gap-4 sm:gap-7">
            {clinicians.map((clinician, index) => (
              <div
                key={clinician.id}
                className={index % 2 === 1 ? 'translate-y-2' : ''}
              >
                <PebbleMonogram
                  pebble={clinician.pebble}
                  botanical={clinician.botanical}
                  initials={clinician.initials}
                  size="md"
                  className="h-16 w-20 sm:h-20 sm:w-24"
                />
              </div>
            ))}
          </div>
        }
      >
        <p>
          Read about each clinician in their own words before you decide who to ask for—or leave it open if you would rather we suggest a match.
        </p>
      </PageHead>

      <ClinicianDirectory clinicians={clinicians} approaches={approaches} fees={fees} />

      {/* Reassurance & registration note */}
      <section className="border-t border-line bg-bg py-12 sm:py-16">
        <div className="wrap grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Good to know</p>
            <h2 className="mt-2 font-display text-3xl font-light text-ink">
              Not sure who to <em>ask for?</em>
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-muted md:col-span-7">
            <p>
              Writing &ldquo;no preference&rdquo; in your enquiry is completely fine. Let us know the days that suit you, whether you prefer in-person or telehealth sessions, and a broad sense of what brings you here, and we will suggest who currently has openings that fit.
            </p>
            <p className="text-sm text-ink/80">
              Registration details are available on request. Every clinician practices within their professional registration and code of ethics.
            </p>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Start softly"
        heading={
          <>
            Ready to ask about <em>availability or fit?</em>
          </>
        }
        body="An enquiry does not book a session—we reply within two business days to arrange a free 15-minute fit call first."
        actionLabel="Make a first enquiry"
      />
    </>
  );
}
