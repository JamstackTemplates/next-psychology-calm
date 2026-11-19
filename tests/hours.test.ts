import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  DAYS,
  openingLabel,
  receptionOpeningLabel,
  validateHours,
  type OpeningHours,
} from '../lib/hours.ts';

const sampleHours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const atSample = (date: string, zone = 'America/New_York') =>
  openingLabel(sampleHours, zone, new Date(date));

const atPractice = (date: string) =>
  receptionOpeningLabel(business.hours, 'Australia/Sydney', new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atSample('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('Still Waters Wellbeing opening and closing boundaries in Australia/Sydney', () => {
  // Friday 12 June 2026 (AEST = UTC+10): 16:59 open, 17:00 closed -> opens Sat 09:00
  assert.equal(atPractice('2026-06-12T06:59:00Z'), 'Reception open now · until 17:00');
  assert.equal(atPractice('2026-06-12T07:00:00Z'), 'Reception closed · opens Sat 09:00');

  // Thursday 11 June 2026 (AEST = UTC+10): 19:59 open until 20:00, 20:00 closed -> opens Fri 08:00
  assert.equal(atPractice('2026-06-11T09:59:00Z'), 'Reception open now · until 20:00');
  assert.equal(atPractice('2026-06-11T10:00:00Z'), 'Reception closed · opens Fri 08:00');

  // Saturday 13 June 2026 (AEST = UTC+10): 09:00 open until 13:00, 13:00 closed -> opens Mon 08:00
  assert.equal(atPractice('2026-06-12T23:00:00Z'), 'Reception open now · until 13:00');
  assert.equal(atPractice('2026-06-13T03:00:00Z'), 'Reception closed · opens Mon 08:00');

  // Sunday 14 June 2026: closed all day -> opens Mon 08:00
  assert.equal(atPractice('2026-06-14T00:00:00Z'), 'Reception closed · opens Mon 08:00');
});

test('Australia/Sydney DST transitions preserve local hours (first Sunday of April & October)', () => {
  // First Sunday of April 2026 is 5 April (AEDT UTC+11 -> AEST UTC+10 at 03:00 -> 02:00)
  // Sat 4 Apr 12:59 AEDT = 01:59Z (open); 13:00 AEDT = 02:00Z (closed)
  assert.equal(atPractice('2026-04-04T01:59:00Z'), 'Reception open now · until 13:00');
  assert.equal(atPractice('2026-04-04T02:00:00Z'), 'Reception closed · opens Mon 08:00');
  // Sun 5 Apr (DST end day): closed
  assert.equal(atPractice('2026-04-05T00:00:00Z'), 'Reception closed · opens Mon 08:00');
  // Mon 6 Apr (now AEST UTC+10): 07:59 = Sun 21:59Z (closed), 08:00 = Sun 22:00Z (open until 20:00)
  assert.equal(atPractice('2026-04-05T21:59:00Z'), 'Reception closed · opens today 08:00');
  assert.equal(atPractice('2026-04-05T22:00:00Z'), 'Reception open now · until 20:00');

  // First Sunday of October 2026 is 4 October (AEST UTC+10 -> AEDT UTC+11 at 02:00 -> 03:00)
  // Sat 3 Oct 08:59 AEST = Fri 22:59Z (closed); 09:00 AEST = Fri 23:00Z (open)
  assert.equal(atPractice('2026-10-02T22:59:00Z'), 'Reception closed · opens today 09:00');
  assert.equal(atPractice('2026-10-02T23:00:00Z'), 'Reception open now · until 13:00');
  // Sun 4 Oct (DST start day): closed
  assert.equal(atPractice('2026-10-03T23:00:00Z'), 'Reception closed · opens Mon 08:00');
  // Mon 5 Oct (now AEDT UTC+11): 07:59 = Sun 20:59Z (closed), 08:00 = Sun 21:00Z (open until 20:00)
  assert.equal(atPractice('2026-10-04T20:59:00Z'), 'Reception closed · opens today 08:00');
  assert.equal(atPractice('2026-10-04T21:00:00Z'), 'Reception open now · until 20:00');
});

test('closed weekdays, week wrap and missing/invalid zones behave safely', () => {
  assert.equal(atSample('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(atSample('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
  assert.equal(atSample('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(receptionOpeningLabel(business.hours, '', new Date('2026-06-12T06:59:00Z')), '');
  assert.equal(receptionOpeningLabel(business.hours, 'Mars/Base', new Date('2026-06-12T06:59:00Z')), '');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(sampleHours));
  assert.doesNotThrow(() => validateHours(business.hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(sampleHours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
