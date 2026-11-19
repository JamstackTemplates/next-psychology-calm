'use client';

import { useEffect, useId, useState } from 'react';
import type { Approach } from '../content/approaches';
import { availabilityLabel, formatSessionModes, type Clinician } from '../content/clinicians';
import { formatAud, type FeeItem } from '../content/fees';
import { PebbleMonogram } from './artwork';
import { ClockIcon, LocationIcon, TelehealthIcon } from './icons';
import { SiteLink } from './site-link';

interface ClinicianDirectoryProps {
  clinicians: readonly Clinician[];
  approaches: readonly Approach[];
  fees: readonly FeeItem[];
}

/**
 * Filterable clinician letters of introduction.
 * - Without JS: all profiles show and the filter bar is hidden (progressive enhancement).
 * - With JS: approach select + "Accepting new clients" toggle update URL query parameters.
 */
export function ClinicianDirectory({ clinicians, approaches, fees }: ClinicianDirectoryProps) {
  const selectId = useId();
  const [hydrated, setHydrated] = useState(false);
  const [selectedApproach, setSelectedApproach] = useState<string>('');
  const [openOnly, setOpenOnly] = useState(false);

  const approachById = new Map(approaches.map(item => [item.id, item]));
  const feeById = new Map(fees.map(item => [item.id, item]));

  // Read initial query params on mount and show the filter bar only when JS is active
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramApproach = params.get('approach') ?? '';
    const validApproach = approaches.some(item => item.id === paramApproach) ? paramApproach : '';
    const paramOpen = params.get('open') === '1' || params.get('open') === 'true';
    setSelectedApproach(validApproach);
    setOpenOnly(paramOpen);
    setHydrated(true);
  }, [approaches]);

  // Reflect filter state into URL query string without adding noisy history entries
  useEffect(() => {
    if (!hydrated) return;
    const url = new URL(window.location.href);
    if (selectedApproach) url.searchParams.set('approach', selectedApproach);
    else url.searchParams.delete('approach');
    if (openOnly) url.searchParams.set('open', '1');
    else url.searchParams.delete('open');
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [hydrated, selectedApproach, openOnly]);

  const visibleClinicians = hydrated
    ? clinicians.filter(clinician => {
        if (openOnly && clinician.availability !== 'open') return false;
        if (selectedApproach && !clinician.approaches.includes(selectedApproach)) return false;
        return true;
      })
    : clinicians;

  const hasFilters = Boolean(selectedApproach || openOnly);

  function resetFilters() {
    setSelectedApproach('');
    setOpenOnly(false);
  }

  return (
    <div>
      {/* Sticky filter bar — rendered only with JS so no-JS shows all profiles without inert controls */}
      {hydrated ? (
        <div className="no-print sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-xs">
          <div className="wrap flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5">
                <label htmlFor={selectId} className="eyebrow text-ink/80">
                  Approach
                </label>
                <select
                  id={selectId}
                  value={selectedApproach}
                  onChange={event => setSelectedApproach(event.target.value)}
                  className="min-h-10 rounded-full border border-line-solid bg-surface px-4 py-1.5 text-sm font-medium text-ink"
                >
                  <option value="">All approaches</option>
                  {approaches.map(approach => (
                    <option key={approach.id} value={approach.id}>
                      {approach.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                aria-pressed={openOnly}
                onClick={() => setOpenOnly(prev => !prev)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  openOnly
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-line-solid bg-surface text-ink hover:bg-sand-deep'
                }`}
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    openOnly ? 'bg-on-primary' : 'bg-sage'
                  }`}
                  aria-hidden="true"
                />
                <span>Accepting new clients</span>
              </button>

              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold text-primary-ink underline underline-offset-4 hover:text-ink"
                >
                  Clear filters
                </button>
              ) : null}
            </div>

            <p className="text-sm text-muted" role="status" aria-live="polite">
              Showing {visibleClinicians.length} of {clinicians.length} clinicians
            </p>
          </div>
        </div>
      ) : null}

      {/* Letter-of-introduction profiles, alternating offset left and right (not a card grid) */}
      <div className="wrap py-12 sm:py-16">
        {visibleClinicians.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[var(--radius-pebble)] bg-surface px-8 py-12 text-center">
            <p className="font-display text-2xl italic text-ink sm:text-3xl">
              No one matches. Every clinician can talk you through options.
            </p>
            <p className="mt-3 text-muted">
              You can clear the filter above, or write to us with &ldquo;no preference&rdquo; and we will suggest someone who fits.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <SiteLink href="/contact/" className="button">
                Make a first enquiry
              </SiteLink>
              <button type="button" onClick={resetFilters} className="button button-quiet">
                Show all clinicians
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-16 sm:space-y-24">
            {visibleClinicians.map((clinician, index) => {
              const offsetRight = index % 2 === 1;
              return (
                <article
                  key={clinician.id}
                  id={clinician.id}
                  className="grid scroll-mt-24 lg:grid-cols-12"
                >
                  <div
                    className={`relative rounded-[var(--radius-pebble)] bg-surface px-6 pt-12 pb-8 sm:px-10 sm:pt-14 sm:pb-10 lg:col-span-9 ${
                      offsetRight ? 'lg:col-start-4' : 'lg:col-start-1'
                    }`}
                  >
                    {/* Pebble monogram overlapping the top-left edge */}
                    <div className="pebble-lift -mt-20 mb-4 sm:-mt-22 sm:-ml-4">
                      <PebbleMonogram
                        pebble={clinician.pebble}
                        botanical={clinician.botanical}
                        initials={clinician.initials}
                        size="lg"
                      />
                    </div>

                    {/* Name, pronouns, role & availability ribbon */}
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
                      <div>
                        <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
                          {clinician.name}{' '}
                          <span className="text-xl italic text-muted">({clinician.pronouns})</span>
                        </h2>
                        <p className="eyebrow mt-1.5 text-primary-ink">{clinician.roleLabel}</p>
                      </div>

                      <span className="status-pill" data-status={clinician.availability}>
                        <span className="status-dot" aria-hidden="true" />
                        <span>{availabilityLabel(clinician.availability)}</span>
                      </span>
                    </div>

                    {/* "In their own words" pull paragraph */}
                    <blockquote className="mt-6 max-w-2xl border-l-2 border-sage pl-5 font-display text-xl leading-relaxed text-ink/95 sm:text-[1.35rem]">
                      <p className="m-0">&ldquo;{clinician.inTheirWords}&rdquo;</p>
                    </blockquote>

                    {/* Two-column detail list: focus, approaches, modes, days and fee tier */}
                    <dl className="mt-8 grid gap-x-10 gap-y-5 border-t border-line pt-6 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="eyebrow">Focus areas</dt>
                        <dd className="mt-2 text-base text-ink">
                          {clinician.focus.join(' · ')}
                        </dd>
                      </div>

                      <div>
                        <dt className="eyebrow">Ways of working</dt>
                        <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                          {clinician.approaches.map(approachId => {
                            const approach = approachById.get(approachId);
                            if (!approach) return null;
                            return (
                              <SiteLink
                                key={approach.id}
                                href={`/approaches/#${approach.id}`}
                                className="text-link text-[0.9375rem]"
                              >
                                {approach.name}
                              </SiteLink>
                            );
                          })}
                        </dd>
                      </div>

                      <div>
                        <dt className="eyebrow">Sessions &amp; days</dt>
                        <dd className="mt-2 space-y-1 text-[0.9375rem] text-ink">
                          <p className="flex items-center gap-2">
                            {clinician.modes.includes('telehealth') ? (
                              <TelehealthIcon className="h-4 w-4 text-primary-ink" />
                            ) : (
                              <LocationIcon className="h-4 w-4 text-primary-ink" />
                            )}
                            <span>{formatSessionModes(clinician.modes)}</span>
                          </p>
                          <p className="flex items-center gap-2 text-muted">
                            <ClockIcon className="h-4 w-4 text-muted" />
                            <span>{clinician.days}</span>
                          </p>
                        </dd>
                      </div>

                      <div>
                        <dt className="eyebrow">Fee tier</dt>
                        <dd className="mt-2 space-y-1 text-[0.9375rem]">
                          {clinician.feeIds.map(feeId => {
                            const fee = feeById.get(feeId);
                            if (!fee) return null;
                            return (
                              <p key={fee.id}>
                                <SiteLink href={`/fees/#${fee.id}`} className="text-link">
                                  {fee.label} — {formatAud(fee.price)}
                                </SiteLink>{' '}
                                <span className="text-muted">({fee.minutes} min)</span>
                              </p>
                            );
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
