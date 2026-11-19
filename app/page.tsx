import type { Metadata } from 'next';
import {
  BeginSteps,
  CrisisBand,
  FindUsBand,
  HomeHero,
  PracticeQualities,
  RakedFeesPreview,
  ShorelineApproaches,
  SteppingClinicians,
} from '../components/sections';
import { Shoreline } from '../components/artwork';
import { approaches } from '../content/approaches';
import { clinicians, openCliniciansSummary } from '../content/clinicians';
import { fees } from '../content/fees';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <HomeHero
        headline={
          <>
            Somewhere <em>quiet</em> to&nbsp;begin.
          </>
        }
        primaryAction="Make a first enquiry"
        subline="Counselling and psychology for adults and couples on the Kingston Foreshore. Unhurried sessions, clear fees, and people you can read about before you call."
        secondaryAction="Meet the clinicians"
        availabilitySummary={openCliniciansSummary(clinicians)}
      />

      <Shoreline above="var(--water-deep)" below="var(--surface)" variant={0} />

      <PracticeQualities eyebrow="What it’s like here">
        <PracticeQualities.Item step={0} phrase="A waiting room you rarely share.">
          Appointments are staggered across our rooms so arrivals and departures seldom cross paths, giving you a quiet minute to settle before you sit down.
        </PracticeQualities.Item>
        <PracticeQualities.Item step={1} phrase="Soundproofed rooms facing the water.">
          Each room is acoustically insulated and looks towards Lake Burley Griffin—warm natural timber, soft daylight and no clinical strip lighting.
        </PracticeQualities.Item>
        <PracticeQualities.Item step={2} phrase="In person, or from home by telehealth.">
          Meet with your clinician on Eastlake Parade or join by secure video from anywhere in Australia, and switch between the two whenever life asks for it.
        </PracticeQualities.Item>
      </PracticeQualities>

      <Shoreline above="var(--surface)" below="color-mix(in srgb, var(--water) 72%, var(--sky-horizon))" variant={1} />

      <ShorelineApproaches
        eyebrow="Ways of working"
        heading={
          <>
            Seven approaches, explained <em>plainly</em>
          </>
        }
        intro="You do not need to know which acronym fits before you reach out. Your clinician will talk through what may help at your own pace."
        ctaLabel="Explore all approaches"
        items={approaches}
      />

      <Shoreline above="var(--water-deep)" below="var(--bg)" variant={2} />

      <SteppingClinicians
        eyebrow="Who you’d be talking to"
        heading={
          <>
            Four clinicians, <em>read about first</em>
          </>
        }
        intro="Three psychologists and one counsellor seeing adults (18+) and couples. Ask for someone specific, or let us know you have no preference."
        ctaLabel="Read full profiles"
        items={clinicians}
      />

      <Shoreline above="var(--bg)" below="var(--sand-deep)" variant={0} />

      <RakedFeesPreview
        eyebrow="Fees, plainly"
        heading={
          <>
            Clear fees and <em>Medicare</em> notes
          </>
        }
        fromNote="Standard sessions run for 50 minutes (80 minutes for couples). Medicare rebates apply to eligible psychologist sessions with a GP plan; we confirm your current gap when we reply."
        ctaLabel="Full fees & rebates"
        items={fees}
      />

      <Shoreline above="var(--sand-deep)" below="var(--surface)" variant={1} />

      <BeginSteps
        eyebrow="How to begin"
        heading={
          <>
            Four unhurried <em>steps</em>
          </>
        }
      >
        <BeginSteps.Step number="1" title="Send an enquiry">
          Write a brief note through our enquiry page or by email. You do not need to share personal details yet.
        </BeginSteps.Step>
        <BeginSteps.Step number="2" title="Have a free 15-minute fit call">
          We reply within two business days to arrange a short phone chat about who might suit and what days work.
        </BeginSteps.Step>
        <BeginSteps.Step number="3" title="Ask your GP if claiming Medicare">
          If you are seeing a psychologist and would like a Medicare rebate, ask your GP about a Mental Health Treatment Plan before your first session.
        </BeginSteps.Step>
        <BeginSteps.Step number="4" title="Come to your first session">
          Take a breath by the water, come up to Suite 3, and begin at a pace that feels steady for you.
        </BeginSteps.Step>
      </BeginSteps>

      <Shoreline above="var(--surface)" below="var(--crisis-bg)" variant={2} />

      <CrisisBand
        eyebrow="If you need help now"
        heading={
          <>
            Support is available <em>tonight</em>
          </>
        }
        note="Still Waters Wellbeing is not a crisis or emergency service. Enquiries and messages are read during reception hours only."
        moreLabel="See all 24/7 and ACT support lines"
      />

      <Shoreline above="var(--crisis-bg)" below="var(--bg)" variant={0} />

      <FindUsBand
        eyebrow="Find us"
        heading={
          <>
            On the <em>Kingston Foreshore</em>
          </>
        }
        directionsLabel="Get directions"
        enquireLabel="Make a first enquiry"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
