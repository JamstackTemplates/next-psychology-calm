'use client';

import { useEffect, useState } from 'react';
import { receptionOpeningLabel, resolveOpeningState, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-only reception status pill computed in the configured IANA zone (Australia/Sydney)
 * and refreshed every minute. Renders nothing in static/no-JS HTML so only the neutral hours table appears.
 */
export function OpenBadge({
  hours,
  timeZone = site.timeZone || 'Australia/Sydney',
  className = '',
}: {
  hours: readonly OpeningHours[];
  timeZone?: string;
  className?: string;
}) {
  const [state, setState] = useState<{ label: string; open: boolean } | null>(null);

  useEffect(() => {
    const update = () => {
      const label = receptionOpeningLabel(hours, timeZone);
      if (!label) {
        setState(null);
        return;
      }
      const resolved = resolveOpeningState(hours, timeZone);
      setState({ label, open: resolved.status === 'open' });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, timeZone]);

  if (!state) return null;

  return (
    <span
      className={`status-pill ${className}`}
      data-status={state.open ? 'open' : 'closed'}
    >
      <span className="status-dot" aria-hidden="true" />
      <span>{state.label}</span>
    </span>
  );
}
