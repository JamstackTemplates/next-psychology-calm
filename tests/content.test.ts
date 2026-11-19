import assert from 'node:assert/strict';
import { test } from 'node:test';
import { approaches } from '../content/approaches.ts';
import { business } from '../content/business.ts';
import { clinicians, openCliniciansSummary } from '../content/clinicians.ts';
import { crisisLines } from '../content/crisis.ts';
import { fees, lowestStandardFee, reducedFee } from '../content/fees.ts';
import { validatePracticeContent, type PracticeContentBundle } from '../content/validate.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

function validBundle(): PracticeContentBundle {
  return {
    business,
    approaches,
    clinicians,
    fees,
    reducedFee,
    crisisLines,
  };
}

test('all shipped practice content passes cross-collection validation', () => {
  assert.doesNotThrow(() => validatePracticeContent(validBundle()));
  assert.equal(approaches.length, 7);
  assert.equal(clinicians.length, 4);
  assert.equal(fees.length, 5);
  assert.equal(crisisLines.length, 7);
});

test('derived home copy reflects clinician availability and lowest standard fee', () => {
  assert.equal(openCliniciansSummary(clinicians), '2 of 4 clinicians are taking new clients');
  assert.equal(lowestStandardFee(fees), 160);

  // Simulate frequent owner edit: set jo-kettering.availability to 'open'
  const edited = clinicians.map(c => (c.id === 'jo-kettering' ? { ...c, availability: 'open' as const } : c));
  assert.equal(openCliniciansSummary(edited), '3 of 4 clinicians are taking new clients');
});

test('unknown approach or fee reference fails with an item-specific message', () => {
  const badApproach = validBundle();
  badApproach.clinicians = clinicians.map(c =>
    c.id === 'jo-kettering' ? { ...c, approaches: ['narative', 'mindfulness'] } : c,
  );
  assert.throws(
    () => validatePracticeContent(badApproach),
    /clinician jo-kettering references unknown approach 'narative'/,
  );

  const badFee = validBundle();
  badFee.clinicians = clinicians.map(c =>
    c.id === 'tomas-reyes' ? { ...c, feeIds: ['unknown-tier'] } : c,
  );
  assert.throws(
    () => validatePracticeContent(badFee),
    /clinician tomas-reyes references unknown fee 'unknown-tier'/,
  );
});

test('every approach must be offered by at least one clinician', () => {
  const bundle = validBundle();
  bundle.approaches = [
    ...approaches,
    {
      id: 'unassigned-approach',
      name: 'Unassigned approach',
      short: 'Short summary under ninety chars.',
      description: 'Description',
      sessionFeelsLike: 'Calm',
      oftenSuits: ['Testing'],
      glyph: 'single-ripple',
    },
  ];
  assert.throws(
    () => validatePracticeContent(bundle),
    /approach 'unassigned-approach' is not offered by any clinician/,
  );
});

test('collection IDs must be unique and URL-safe', () => {
  const duplicate = validBundle();
  duplicate.approaches = [...approaches, { ...approaches[0] }];
  assert.throws(() => validatePracticeContent(duplicate), /duplicate id 'cbt'/);

  const unsafe = validBundle();
  unsafe.crisisLines = [...crisisLines, { ...crisisLines[0], id: 'Bad ID!' }];
  assert.throws(() => validatePracticeContent(unsafe), /invalid URL-safe id 'Bad ID!'/);
});

test('fee prices, Medicare rules, counsellor guardrails and reduced-fee bounds are enforced', () => {
  const zeroPaid = validBundle();
  zeroPaid.fees = fees.map(f => (f.id === 'counselling-session' ? { ...f, price: 0 } : f));
  assert.throws(() => validatePracticeContent(zeroPaid), /only fit-call may have a price of 0/);

  const fractional = validBundle();
  fractional.fees = fees.map(f => (f.id === 'psychologist-session' ? { ...f, price: 235.5 } : f));
  assert.throws(() => validatePracticeContent(fractional), /whole AUD amount between 0 and 1000/);

  const overMax = validBundle();
  overMax.fees = fees.map(f => (f.id === 'couples-session' ? { ...f, price: 1200 } : f));
  assert.throws(() => validatePracticeContent(overMax), /whole AUD amount between 0 and 1000/);

  const medicareOnCouples = validBundle();
  medicareOnCouples.fees = fees.map(f =>
    f.id === 'couples-session' ? { ...f, medicare: 'general' as const } : f,
  );
  assert.throws(
    () => validatePracticeContent(medicareOnCouples),
    /counselling and couples sessions must have medicare set to 'none'/,
  );

  const counsellorWithMedicare = validBundle();
  counsellorWithMedicare.clinicians = clinicians.map(c =>
    c.id === 'jo-kettering' ? { ...c, feeIds: ['psychologist-session'] } : c,
  );
  assert.throws(
    () => validatePracticeContent(counsellorWithMedicare),
    /clinician jo-kettering is a counsellor and cannot reference Medicare-eligible fee/,
  );

  const highReduced = validBundle();
  highReduced.reducedFee = {
    ...reducedFee,
    examples: [{ feeId: 'counselling-session', price: 160 }],
  };
  assert.throws(
    () => validatePracticeContent(highReduced),
    /below its base fee/,
  );
});

test('crisis lines require digit-only tel, emergency 000 and lifeline', () => {
  const nonDigitTel = validBundle();
  nonDigitTel.crisisLines = crisisLines.map(line =>
    line.id === 'lifeline' ? { ...line, tel: '13 11 14' } : line,
  );
  assert.throws(() => validatePracticeContent(nonDigitTel), /must contain digits only/);

  const missingEmergency = validBundle();
  missingEmergency.crisisLines = crisisLines.filter(line => line.id !== 'emergency');
  assert.throws(() => validatePracticeContent(missingEmergency), /required 'emergency' entry/);

  const missingLifeline = validBundle();
  missingLifeline.crisisLines = crisisLines.filter(line => line.id !== 'lifeline');
  assert.throws(() => validatePracticeContent(missingLifeline), /required 'lifeline' entry/);
});

test('structured data emits MedicalClinic derived from content with no reviews or ratings', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'MedicalClinic');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.priceRange, '$$');
  assert.equal(schema.address.addressLocality, 'Kingston');
  assert.equal(schema.address.addressRegion, 'ACT');
  assert.equal(schema.openingHoursSpecification.length, 6);
  assert.equal(schema.employee.length, clinicians.length);
  assert.deepEqual(
    schema.employee.map(person => ({ name: person.name, jobTitle: person.jobTitle })),
    clinicians.map(c => ({ name: c.name, jobTitle: c.roleLabel })),
  );
  assert.ok(!('aggregateRating' in schema));
  assert.ok(!('review' in schema));
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
