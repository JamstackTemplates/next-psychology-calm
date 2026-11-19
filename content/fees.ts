export type MedicareEligibility = 'clinical' | 'general' | 'none';
export type PrivateHealthNote = 'often' | 'check-fund';

export interface FeeItem {
  /** Stable URL-safe identifier; used as anchor on /fees/#<id> and referenced by clinicians. */
  id: string;
  /** Plain-language session type shown in the tide table. */
  label: string;
  /** Session duration in minutes. */
  minutes: number;
  /** Whole AUD dollars, GST-free. Only fit-call may be 0. */
  price: number;
  /** Medicare rebate tier under a GP Mental Health Treatment Plan; no dollar figures are stated. */
  medicare: MedicareEligibility;
  /** Optional private health extras note; omitted for free fit calls. */
  privateHealth?: PrivateHealthNote;
  /** One-line plain summary shown on Home and Fees & rebates. */
  note: string;
}

export interface ReducedFeeExample {
  /** Must reference a valid FeeItem.id. */
  feeId: string;
  /** Whole AUD reduced fee; must be lower than the base fee. */
  price: number;
}

export interface ReducedFeeInfo {
  /** Owner edit: set to false when reduced-fee places are full. */
  available: boolean;
  /** Plain-language note about eligibility and availability. */
  note: string;
  /** Illustrative reduced-fee rates for eligible students and concession card holders. */
  examples: readonly ReducedFeeExample[];
}

export const fees: readonly FeeItem[] = [
  {
    id: 'fit-call',
    label: 'Fit call (phone)',
    minutes: 15,
    price: 0,
    medicare: 'none',
    note: 'A brief phone chat to talk through fit, availability and next steps before booking.',
  },
  {
    id: 'clinical-session',
    label: 'Clinical psychologist session',
    minutes: 50,
    price: 270,
    medicare: 'clinical',
    privateHealth: 'often',
    note: 'Higher Medicare rebate eligible with a GP Mental Health Treatment Plan.',
  },
  {
    id: 'psychologist-session',
    label: 'Psychologist session',
    minutes: 50,
    price: 235,
    medicare: 'general',
    privateHealth: 'often',
    note: 'Medicare rebate eligible with a GP Mental Health Treatment Plan.',
  },
  {
    id: 'counselling-session',
    label: 'Counselling session',
    minutes: 50,
    price: 160,
    medicare: 'none',
    privateHealth: 'check-fund',
    note: 'Not covered by Medicare. Some private health extras policies include counselling.',
  },
  {
    id: 'couples-session',
    label: 'Couples session',
    minutes: 80,
    price: 330,
    medicare: 'none',
    privateHealth: 'check-fund',
    note: 'Extended 80-minute session for two partners. Not covered by Medicare.',
  },
];

export const reducedFee: ReducedFeeInfo = {
  available: true,
  note: 'We keep a small number of reduced-fee places for full-time students and concession card holders. Mention this when you enquire and we will let you know whether a place is open.',
  examples: [
    { feeId: 'psychologist-session', price: 160 },
    { feeId: 'counselling-session', price: 110 },
  ],
};

/** Format whole AUD dollars cleanly, or "Free" when zero. */
export function formatAud(amount: number): string {
  return amount === 0 ? 'Free' : `$${amount}`;
}

/** Human-readable Medicare column label; states no rebate dollar figures. */
export function medicareLabel(tier: MedicareEligibility): string {
  switch (tier) {
    case 'clinical':
      return 'Eligible (higher clinical rebate)';
    case 'general':
      return 'Eligible with GP plan';
    case 'none':
      return 'Not Medicare-eligible';
  }
}

/** Human-readable private health column label. */
export function privateHealthLabel(note?: PrivateHealthNote): string {
  switch (note) {
    case 'often':
      return 'Often covered under extras';
    case 'check-fund':
      return 'Check with your fund';
    default:
      return '—';
  }
}

/** Lowest standard paid session fee, derived from data for Home's "from $X" display. */
export function lowestStandardFee(items: readonly FeeItem[] = fees): number {
  const paid = items.filter(item => item.price > 0).map(item => item.price);
  if (paid.length === 0) throw new Error('fees: at least one paid session is required');
  return Math.min(...paid);
}
