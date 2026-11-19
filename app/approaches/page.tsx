import type { Metadata } from 'next';
import { ReedsMotif } from '../../components/artwork';
import { PageHead } from '../../components/page-head';
import { ApproachRows, PageCta, SettleBand } from '../../components/sections';
import { approaches } from '../../content/approaches';
import { clinicians } from '../../content/clinicians';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Approaches',
  description:
    'Plain-language explanations of CBT, ACT, Schema Therapy, EMDR, Emotionally Focused Therapy, Narrative Therapy and Mindfulness-based therapy at Still Waters Wellbeing.',
  alternates: { canonical: absoluteUrl('/approaches/') },
};

export default function ApproachesPage() {
  return (
    <>
      <PageHead
        eyebrow="Approaches"
        title={
          <>
            Ways of <em>working</em>
          </>
        }
        art={<ReedsMotif className="h-20 w-52" />}
      >
        <p>
          You don’t need to pick an approach before you enquire. Your clinician will talk it through with you and shape sessions around what feels steady and useful.
        </p>
      </PageHead>

      <ApproachRows approaches={approaches} clinicians={clinicians} />

      <SettleBand
        eyebrow="A minute to settle"
        heading={
          <>
            Follow the <em>ripple</em> for six slow breaths
          </>
        }
      >
        <p>
          Slowing the out-breath slightly longer than the in-breath can help settle a racing pulse before a phone call or a busy hour. This is simply a quiet calming exercise—not a therapy or clinical treatment.
        </p>
      </SettleBand>

      <PageCta
        eyebrow="Next step"
        heading={
          <>
            Not sure which fits? <em>That’s what the first call is for.</em>
          </>
        }
        body="Send a short enquiry and we will reply within two business days to arrange a free 15-minute phone fit call."
        actionLabel="Make a first enquiry"
      />
    </>
  );
}
