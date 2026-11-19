import type { Metadata } from 'next';
import { LakesideLamp } from '../../components/artwork';
import { PageHead } from '../../components/page-head';
import { PageCta, UrgentSupportList } from '../../components/sections';
import { crisisLines } from '../../content/crisis';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Urgent help',
  description:
    '24/7 Australian and ACT crisis and mental health support numbers. Still Waters Wellbeing is not an emergency service; call 000 in immediate danger.',
  alternates: { canonical: absoluteUrl('/urgent-help/') },
};

export default function UrgentHelpPage() {
  return (
    <>
      <PageHead
        eyebrow="Urgent help"
        title={
          <>
            If you need <em>help now</em>
          </>
        }
        art={<LakesideLamp className="h-40 w-32 sm:h-48 sm:w-36" />}
      >
        <p className="font-display text-[clamp(1.6rem,3.2vw,2.35rem)] leading-[1.2] font-light text-ink">
          If you or someone else is in immediate danger, call{' '}
          <a
            href="tel:000"
            className="font-normal text-clay underline decoration-clay/50 hover:decoration-clay"
          >
            000
          </a>
          .
        </p>
        <p className="mt-4 text-base text-muted">
          Still Waters Wellbeing is not a crisis or emergency service. Enquiries and messages are read during reception hours only.
        </p>
      </PageHead>

      <section aria-label="Crisis and support phone lines" className="bg-bg py-12 sm:py-16">
        <div className="wrap">
          <p className="eyebrow mb-6">24/7 and specialist support lines</p>
          <UrgentSupportList lines={crisisLines} />
        </div>
      </section>

      <PageCta
        eyebrow="After you’re safe"
        heading={
          <>
            When you are ready for <em>ongoing support</em>
          </>
        }
        body="Once the immediate moment has passed, Still Waters Wellbeing is here for steady, ongoing counselling and psychology during reception hours."
        actionLabel="Make a first enquiry"
        tone="surface"
      />
    </>
  );
}
