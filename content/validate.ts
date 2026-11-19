import { validateHours } from '../lib/hours.ts';
import type { Approach } from './approaches.ts';
import type { Business } from './business.ts';
import type { Clinician } from './clinicians.ts';
import type { CrisisLine } from './crisis.ts';
import type { FeeItem, ReducedFeeInfo } from './fees.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DIGITS_ONLY = /^\d+$/;
const VALID_AVAILABILITY = new Set(['open', 'waitlist', 'closed']);
const VALID_MEDICARE = new Set(['clinical', 'general', 'none']);
const VALID_ROLES = new Set(['clinical-psychologist', 'psychologist', 'counsellor']);
const VALID_MODES = new Set(['in-person', 'telehealth']);

export interface PracticeContentBundle {
  business: Business;
  approaches: readonly Approach[];
  clinicians: readonly Clinician[];
  fees: readonly FeeItem[];
  reducedFee: ReducedFeeInfo;
  crisisLines: readonly CrisisLine[];
}

function assertUniqueUrlSafeIds(kind: string, items: readonly { id: string }[]): Set<string> {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id || !URL_SAFE_ID.test(item.id)) {
      throw new Error(`${kind} has invalid URL-safe id '${item.id}'`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${kind} has duplicate id '${item.id}'`);
    }
    seen.add(item.id);
  }
  return seen;
}

/** Validate all practice collections and cross-references with item-specific failures. */
export function validatePracticeContent(bundle: PracticeContentBundle): void {
  const { business, approaches, clinicians, fees, reducedFee, crisisLines } = bundle;

  // Business basics
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'landmark', 'locationNote', 'acknowledgement'] as const) {
    if (!business[key]?.trim()) throw new Error(`business.${key}: required`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email)) {
    throw new Error(`business.email: '${business.email}' is not a valid email address`);
  }
  if (!DIGITS_ONLY.test(business.phoneTel)) {
    throw new Error(`business.phoneTel: '${business.phoneTel}' must contain digits only`);
  }
  if (!business.address.formatted.trim()) {
    throw new Error('business.address.formatted: required');
  }
  if (!business.enquiries.title.trim() || !business.enquiries.introduction.trim()) {
    throw new Error('business.enquiries: title and introduction are required');
  }
  if (business.enquiries.usefulToInclude.length === 0) {
    throw new Error('business.enquiries.usefulToInclude: include message guidance');
  }
  for (const tip of business.enquiries.usefulToInclude) {
    if (!tip.trim()) throw new Error('business.enquiries.usefulToInclude: empty item');
  }
  validateHours(business.hours);

  // Approaches
  if (approaches.length === 0) throw new Error('approaches: at least one approach is required');
  const approachIds = assertUniqueUrlSafeIds('approach', approaches);
  for (const approach of approaches) {
    if (!approach.name.trim()) throw new Error(`approach ${approach.id}: name is required`);
    if (!approach.short.trim() || approach.short.length > 90) {
      throw new Error(`approach ${approach.id}: short summary must be 1–90 characters (got ${approach.short.length})`);
    }
    if (!approach.description.trim()) throw new Error(`approach ${approach.id}: description is required`);
    if (!approach.sessionFeelsLike.trim()) throw new Error(`approach ${approach.id}: sessionFeelsLike is required`);
    if (approach.oftenSuits.length === 0) throw new Error(`approach ${approach.id}: oftenSuits needs at least one entry`);
  }

  // Fees
  if (fees.length === 0) throw new Error('fees: at least one fee item is required');
  const feeIds = assertUniqueUrlSafeIds('fee', fees);
  const feeById = new Map(fees.map(item => [item.id, item]));
  for (const fee of fees) {
    if (!fee.label.trim()) throw new Error(`fee ${fee.id}: label is required`);
    if (!Number.isInteger(fee.minutes) || fee.minutes <= 0) {
      throw new Error(`fee ${fee.id}: minutes must be a positive integer`);
    }
    if (!Number.isInteger(fee.price) || fee.price < 0 || fee.price > 1000) {
      throw new Error(`fee ${fee.id}: price must be a whole AUD amount between 0 and 1000 (got ${fee.price})`);
    }
    if (fee.price === 0 && fee.id !== 'fit-call') {
      throw new Error(`fee ${fee.id}: only fit-call may have a price of 0`);
    }
    if (!VALID_MEDICARE.has(fee.medicare)) {
      throw new Error(`fee ${fee.id}: invalid medicare value '${fee.medicare}'`);
    }
    if ((fee.id === 'counselling-session' || fee.id === 'couples-session') && fee.medicare !== 'none') {
      throw new Error(`fee ${fee.id}: counselling and couples sessions must have medicare set to 'none'`);
    }
    if (!fee.note.trim()) throw new Error(`fee ${fee.id}: note is required`);
  }

  // Reduced fee
  if (typeof reducedFee.available !== 'boolean') {
    throw new Error('reducedFee.available: must be a boolean');
  }
  if (!reducedFee.note.trim()) throw new Error('reducedFee.note: required');
  for (const example of reducedFee.examples) {
    const base = feeById.get(example.feeId);
    if (!base) {
      throw new Error(`reducedFee example references unknown fee '${example.feeId}'`);
    }
    if (!Number.isInteger(example.price) || example.price <= 0 || example.price >= base.price) {
      throw new Error(
        `reducedFee example for '${example.feeId}' ($${example.price}) must be a positive whole dollar amount below its base fee ($${base.price})`,
      );
    }
  }

  // Clinicians
  if (clinicians.length === 0) throw new Error('clinicians: at least one clinician is required');
  assertUniqueUrlSafeIds('clinician', clinicians);
  const offeredApproaches = new Set<string>();
  for (const clinician of clinicians) {
    if (!clinician.name.trim()) throw new Error(`clinician ${clinician.id}: name is required`);
    if (!clinician.pronouns.trim()) throw new Error(`clinician ${clinician.id}: pronouns are required`);
    if (!VALID_ROLES.has(clinician.role)) {
      throw new Error(`clinician ${clinician.id}: invalid role '${clinician.role}'`);
    }
    if (!VALID_AVAILABILITY.has(clinician.availability)) {
      throw new Error(`clinician ${clinician.id}: invalid availability '${clinician.availability}'`);
    }
    if (!clinician.inTheirWords.trim()) {
      throw new Error(`clinician ${clinician.id}: inTheirWords is required`);
    }
    if (clinician.focus.length === 0) {
      throw new Error(`clinician ${clinician.id}: focus needs at least one area`);
    }
    if (clinician.modes.length === 0 || clinician.modes.some(mode => !VALID_MODES.has(mode))) {
      throw new Error(`clinician ${clinician.id}: modes must contain valid session modes`);
    }
    if (clinician.approaches.length === 0) {
      throw new Error(`clinician ${clinician.id}: must offer at least one approach`);
    }
    for (const approachId of clinician.approaches) {
      if (!approachIds.has(approachId)) {
        throw new Error(`clinician ${clinician.id} references unknown approach '${approachId}'`);
      }
      offeredApproaches.add(approachId);
    }
    if (clinician.feeIds.length === 0) {
      throw new Error(`clinician ${clinician.id}: must reference at least one fee`);
    }
    for (const feeId of clinician.feeIds) {
      if (!feeIds.has(feeId)) {
        throw new Error(`clinician ${clinician.id} references unknown fee '${feeId}'`);
      }
      const fee = feeById.get(feeId)!;
      if (clinician.role === 'counsellor' && fee.medicare !== 'none') {
        throw new Error(
          `clinician ${clinician.id} is a counsellor and cannot reference Medicare-eligible fee '${feeId}'`,
        );
      }
    }
  }

  for (const approach of approaches) {
    if (!offeredApproaches.has(approach.id)) {
      throw new Error(`approach '${approach.id}' is not offered by any clinician`);
    }
  }

  // Crisis lines
  const crisisIds = assertUniqueUrlSafeIds('crisis line', crisisLines);
  for (const line of crisisLines) {
    if (!line.name.trim()) throw new Error(`crisis line ${line.id}: name is required`);
    if (!line.number.trim()) throw new Error(`crisis line ${line.id}: display number is required`);
    if (!DIGITS_ONLY.test(line.tel)) {
      throw new Error(`crisis line ${line.id}: tel '${line.tel}' must contain digits only`);
    }
    if (line.textTel && !DIGITS_ONLY.test(line.textTel)) {
      throw new Error(`crisis line ${line.id}: textTel '${line.textTel}' must contain digits only`);
    }
    if (!line.hours.trim()) throw new Error(`crisis line ${line.id}: hours are required`);
    if (!line.forWho.trim()) throw new Error(`crisis line ${line.id}: forWho is required`);
  }
  const emergency = crisisLines.find(line => line.id === 'emergency');
  if (!emergency || emergency.tel !== '000') {
    throw new Error("crisisLines: required 'emergency' entry with tel '000' is missing");
  }
  if (!crisisIds.has('lifeline')) {
    throw new Error("crisisLines: required 'lifeline' entry is missing");
  }
}
