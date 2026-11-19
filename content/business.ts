import type { OpeningHours } from '../lib/hours.ts';

export interface PostalAddress {
  /** Street and suite line, e.g. "Suite 3, 9 Eastlake Parade". */
  streetAddress: string;
  /** Suburb or locality. */
  addressLocality: string;
  /** State or territory abbreviation. */
  addressRegion: string;
  /** Australian four-digit postcode. */
  postalCode: string;
  /** Two-letter ISO country code. */
  addressCountry: string;
  /** Single-line display version used in copy and map links. */
  formatted: string;
}

export interface HoursSummaryRow {
  /** Grouped day label shown in compact tables. */
  days: string;
  /** Display hours or "Closed". */
  hours: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short split wordmark parts for header/footer lockups. */
  wordmark: { primary: string; secondary: string };
  /** Short lead line for the home page and fallback metadata. */
  tagline: string;
  /** Plain-text practice description used by fallback metadata and Schema.org. */
  introduction: string;
  /** Public enquiry email address, always visible alongside the hosted form. */
  email: string;
  /** Public practice phone number (fictitious ACMA range for this gallery sample). */
  phone: string;
  /** Digits-only telephone string for tel: links. */
  phoneTel: string;
  /** Physical premises address on the Kingston Foreshore. */
  address: PostalAddress;
  /** Search query passed to keyless Google Maps helpers. */
  mapQuery: string;
  /** Public landmark near the practice. */
  landmark: string;
  /** Plain-language location note. */
  locationNote: string;
  /** Accessibility, waiting room and parking details. */
  accessNotes: string[];
  /** Seven-day reception and session hours (same-day intervals only). */
  hours: readonly OpeningHours[];
  /** Grouped hours lines for concise display tables. */
  hoursSummary: readonly HoursSummaryRow[];
  /** IANA time zone; mirrors site.config.json timeZone. */
  timeZone: string;
  /** Schema.org priceRange indicator. */
  priceRange: string;
  /** Contact page defaults; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Plain-language intro and metadata description; never implies a confirmed booking. */
    introduction: string;
    /** Prompts for what visitors can write in the message field. */
    usefulToInclude: string[];
  };
  /** Acknowledgement of Country line displayed in the footer. */
  acknowledgement: string;
}

export const business: Business = {
  name: 'Still Waters Wellbeing',
  wordmark: {
    primary: 'Still Waters',
    secondary: 'Wellbeing',
  },
  tagline: 'Somewhere quiet to begin.',
  introduction:
    'Private counselling and psychology on the Kingston Foreshore, Canberra. Calm rooms, clear fees and Medicare rebates, and clinicians you can read about before you call.',
  email: 'hello@stillwaterswellbeing.example',
  phone: '(02) 5550 4127',
  phoneTel: '0255504127',
  address: {
    streetAddress: 'Suite 3, 9 Eastlake Parade',
    addressLocality: 'Kingston',
    addressRegion: 'ACT',
    postalCode: '2604',
    addressCountry: 'AU',
    formatted: 'Suite 3, 9 Eastlake Parade, Kingston ACT 2604',
  },
  mapQuery: 'Suite 3, 9 Eastlake Parade, Kingston ACT 2604, Australia',
  landmark: 'Lake Burley Griffin',
  locationNote: 'On the Kingston Foreshore, a short walk from the lake path beside Lake Burley Griffin.',
  accessNotes: [
    'Step-free entry from Eastlake Parade and lift access to Suite 3',
    'A quiet waiting room with staggered appointment times',
    'Free 2-hour street parking on Eastlake Parade',
  ],
  hours: [
    { day: 'Monday', opens: '08:00', closes: '20:00' },
    { day: 'Tuesday', opens: '08:00', closes: '20:00' },
    { day: 'Wednesday', opens: '08:00', closes: '20:00' },
    { day: 'Thursday', opens: '08:00', closes: '20:00' },
    { day: 'Friday', opens: '08:00', closes: '17:00' },
    { day: 'Saturday', opens: '09:00', closes: '13:00' },
    { day: 'Sunday' },
  ],
  hoursSummary: [
    { days: 'Mon–Thu', hours: '08:00–20:00' },
    { days: 'Fri', hours: '08:00–17:00' },
    { days: 'Sat', hours: '09:00–13:00' },
    { days: 'Sun', hours: 'Closed' },
  ],
  timeZone: 'Australia/Sydney',
  priceRange: '$$',
  enquiries: {
    title: 'Make a first enquiry',
    introduction:
      'Send an enquiry for a first appointment, a question about fit or fees, a GP referral, or a waitlist request. We reply within two business days to arrange a free 15-minute fit call.',
    usefulToInclude: [
      'Who you would like to see, or "no preference"',
      'Whether you are looking for individual or couples sessions',
      'Whether you prefer in-person sessions or telehealth',
      'Days and times that usually suit you',
      'Whether you have, or plan to get, a GP Mental Health Treatment Plan',
      'The best way and time to reach you',
    ],
  },
  acknowledgement: 'We acknowledge the Ngunnawal people, Traditional Custodians of the land on which we work.',
};
