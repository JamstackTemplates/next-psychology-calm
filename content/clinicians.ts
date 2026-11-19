export type ClinicianRole = 'clinical-psychologist' | 'psychologist' | 'counsellor';
export type SessionMode = 'in-person' | 'telehealth';
export type AvailabilityStatus = 'open' | 'waitlist' | 'closed';
export type PebbleShapeId = 'basalt' | 'river-grey' | 'sandstone' | 'sage-green';
export type BotanicalMotifId = 'river-fern' | 'gum-leaf' | 'wattle-sprig' | 'reed';

export interface Clinician {
  /** Stable URL-safe identifier; used as anchor on /clinicians/#<id>. */
  id: string;
  /** Full display name. */
  name: string;
  /** Two-letter initials engraved on the clinician's pebble monogram. */
  initials: string;
  /** Pronouns shown beside the clinician's name. */
  pronouns: string;
  /** Role key used for validation and structured data. */
  role: ClinicianRole;
  /** Public job title displayed on profiles and Schema.org Person.jobTitle. */
  roleLabel: string;
  /** Two or three warm, grounded sentences in the clinician's own voice; no outcome claims. */
  inTheirWords: string;
  /** Key areas of practice. */
  focus: string[];
  /** Approach IDs referencing content/approaches.ts. */
  approaches: string[];
  /** Session formats offered. */
  modes: SessionMode[];
  /** Usual consulting days. */
  days: string;
  /** Owner edit: 'open' | 'waitlist' | 'closed'. Drives Home derived copy, badges and filter. */
  availability: AvailabilityStatus;
  /** Fee IDs referencing content/fees.ts. */
  feeIds: string[];
  /** Distinct river-stone silhouette identifier. */
  pebble: PebbleShapeId;
  /** Tiny botanical motif paired with the pebble. */
  botanical: BotanicalMotifId;
}

export const clinicians: readonly Clinician[] = [
  {
    id: 'maren-holt',
    name: 'Dr Maren Holt',
    initials: 'MH',
    pronouns: 'she/her',
    role: 'clinical-psychologist',
    roleLabel: 'Clinical psychologist',
    inTheirWords:
      'Starting therapy can feel heavy when you have carried something on your own for years. My room is a steady, unhurried place where we pay close attention to your pace and notice what feels safe before touching harder memories. Together we work to make sense of long-standing patterns without rushing you towards quick answers.',
    focus: ['trauma', 'long-standing anxiety', 'grief'],
    approaches: ['schema-therapy', 'emdr', 'cbt'],
    modes: ['in-person', 'telehealth'],
    days: 'Mon, Tue, Thu',
    availability: 'waitlist',
    feeIds: ['clinical-session'],
    pebble: 'basalt',
    botanical: 'river-fern',
  },
  {
    id: 'tomas-reyes',
    name: 'Tomás Reyes',
    initials: 'TR',
    pronouns: 'he/him',
    role: 'psychologist',
    roleLabel: 'Psychologist',
    inTheirWords:
      'A lot of the people I sit with have never spoken to a psychologist before and aren’t quite sure where to begin. We start in plain language—looking at what is wearing you down, how stress is showing up in your sleep or body, and what small shifts might make ordinary weeks feel steadier. Evening appointments are available if workdays are full.',
    focus: ['stress and burnout', 'sleep', "men's mental health"],
    approaches: ['act', 'cbt', 'mindfulness'],
    modes: ['in-person', 'telehealth'],
    days: 'Wed–Fri, incl. evenings',
    availability: 'open',
    feeIds: ['psychologist-session'],
    pebble: 'river-grey',
    botanical: 'gum-leaf',
  },
  {
    id: 'ana-whitfield',
    name: 'Ana Whitfield',
    initials: 'AW',
    pronouns: 'she/her',
    role: 'psychologist',
    roleLabel: 'Psychologist',
    inTheirWords:
      'Whether I am meeting with an individual or a couple, I care about creating enough warmth and fairness in the room that everyone feels heard. Early parenthood, relationship strain and quiet self-doubt can all feel isolating, even when things look fine from the outside. We slow down the moments that feel tangled and look for gentler ways to stay connected.',
    focus: ['couples and relationships', 'perinatal wellbeing', 'self-worth'],
    approaches: ['emotionally-focused', 'act'],
    modes: ['in-person'],
    days: 'Mon, Wed, Sat',
    availability: 'open',
    feeIds: ['psychologist-session', 'couples-session'],
    pebble: 'sandstone',
    botanical: 'wattle-sprig',
  },
  {
    id: 'jo-kettering',
    name: 'Jo Kettering',
    initials: 'JK',
    pronouns: 'they/them',
    role: 'counsellor',
    roleLabel: 'Counsellor',
    inTheirWords:
      'You don’t have to arrive with a diagnosis or a polished story to sit down and talk. I work collaboratively with adults navigating change, identity and belonging—offering an LGBTQIA+ affirming space where your lived context is respected rather than reduced to a checklist. We move at a thoughtful, grounded rhythm that fits who you are.',
    focus: ['life transitions', 'LGBTQIA+ affirming care', 'young adults 18+'],
    approaches: ['narrative', 'mindfulness'],
    modes: ['in-person', 'telehealth'],
    days: 'Tue, Thu, Sat',
    availability: 'closed',
    feeIds: ['counselling-session'],
    pebble: 'sage-green',
    botanical: 'reed',
  },
];

/** Display badge label for a clinician's availability status. */
export function availabilityLabel(status: AvailabilityStatus): string {
  switch (status) {
    case 'open':
      return 'Taking new clients';
    case 'waitlist':
      return 'Waitlist open';
    case 'closed':
      return 'Not taking new clients';
  }
}

/** Derived summary line shown in the Home hero, computed from clinician availability data. */
export function openCliniciansSummary(list: readonly Clinician[] = clinicians): string {
  const openCount = list.filter(clinician => clinician.availability === 'open').length;
  const total = list.length;
  if (openCount === 0) {
    return `All ${total} clinicians are currently full — waitlist enquiries welcome`;
  }
  const verb = openCount === 1 ? 'clinician is' : 'clinicians are';
  return `${openCount} of ${total} ${verb} taking new clients`;
}

/** Human-readable session modes string. */
export function formatSessionModes(modes: readonly SessionMode[]): string {
  const hasInPerson = modes.includes('in-person');
  const hasTelehealth = modes.includes('telehealth');
  if (hasInPerson && hasTelehealth) return 'In-person & telehealth';
  if (hasInPerson) return 'In-person only';
  return 'Telehealth only';
}
