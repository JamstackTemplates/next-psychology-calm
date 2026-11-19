/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];

const SHORT_DAY: Record<Day, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

export interface OpeningState {
  status: 'open' | 'closed' | 'unknown';
  until?: string;
  nextDay?: Day;
  isToday?: boolean;
  nextOpens?: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

/** Resolve current open/closed status in the configured IANA time zone. */
export function resolveOpeningState(hours: readonly OpeningHours[], timeZone: string, now = new Date()): OpeningState {
  if (!timeZone) return { status: 'unknown' };
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return { status: 'unknown' };
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return { status: 'unknown' };
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { status: 'open', until: today.closes };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return { status: 'closed', nextDay: day, isToday: offset === 0, nextOpens: entry.opens };
    }
  }
  return { status: 'closed' };
}

/** Generic label preserved for compatibility with starter tests. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const state = resolveOpeningState(hours, timeZone, now);
  if (state.status === 'unknown') return 'See opening hours';
  if (state.status === 'open') return `Open now · until ${state.until}`;
  if (state.nextDay && state.nextOpens) {
    return `Closed · opens ${state.isToday ? 'today' : state.nextDay} at ${state.nextOpens}`;
  }
  return 'Closed · see opening hours';
}

/** Practice reception status label: "Reception open now · until 20:00" or "Reception closed · opens Sat 09:00". */
export function receptionOpeningLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const state = resolveOpeningState(hours, timeZone, now);
  if (state.status === 'unknown') return '';
  if (state.status === 'open') return `Reception open now · until ${state.until}`;
  if (state.nextDay && state.nextOpens) {
    const dayText = state.isToday ? 'today' : SHORT_DAY[state.nextDay];
    return `Reception closed · opens ${dayText} ${state.nextOpens}`;
  }
  return 'Reception closed';
}
