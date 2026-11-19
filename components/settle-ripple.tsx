'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'inhale' | 'exhale' | 'complete';

const TOTAL_CYCLES = 6;
const INHALE_MS = 4000;
const EXHALE_MS = 6000;

/**
 * Signature element: the Settle Ripple breathing pacer.
 * - 6 cycles (~1 minute) of 4s inhale, 6s exhale.
 * - Polite live-region text cue ("Breathe in…" / "Breathe out…").
 * - Stop and Restart controls; stops automatically when hidden or scrolled out of view.
 * - Under prefers-reduced-motion: rings do not scale; opacity shifts step-wise via CSS.
 * - Without JS: static rings show with the <noscript> breathing caption.
 */
export function SettleRipple({
  variant = 'hero',
}: {
  variant?: 'hero' | 'full';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [phase, setPhase] = useState<Phase>('idle');
  const [cycle, setCycle] = useState(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const stop = useCallback(() => {
    clearTimer();
    setPhase('idle');
    setCycle(0);
  }, [clearTimer]);

  const start = useCallback(() => {
    clearTimer();
    setCycle(1);
    setPhase('inhale');
  }, [clearTimer]);

  // Step through 6 cycles of 4s inhale -> 6s exhale
  useEffect(() => {
    if (phase !== 'inhale' && phase !== 'exhale') return;
    clearTimer();

    if (phase === 'inhale') {
      timerRef.current = setTimeout(() => {
        setPhase('exhale');
      }, INHALE_MS);
    } else {
      timerRef.current = setTimeout(() => {
        if (cycle >= TOTAL_CYCLES) {
          setPhase('complete');
        } else {
          setCycle(prev => prev + 1);
          setPhase('inhale');
        }
      }, EXHALE_MS);
    }

    return clearTimer;
  }, [phase, cycle, clearTimer]);

  // Stop automatically when the tab is hidden or the component scrolls out of view
  useEffect(() => {
    if (phase !== 'inhale' && phase !== 'exhale') return;

    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => !entry.isIntersecting)) {
            stop();
          }
        },
        { threshold: 0.05 },
      );
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
    };
  }, [phase, stop]);

  const isRunning = phase === 'inhale' || phase === 'exhale';
  const cueText =
    phase === 'inhale'
      ? 'Breathe in…'
      : phase === 'exhale'
        ? 'Breathe out…'
        : phase === 'complete'
          ? 'Six slow breaths done.'
          : '';

  const isFull = variant === 'full';

  return (
    <div
      ref={containerRef}
      className={`settle-ripple flex flex-col items-center text-center ${
        isFull ? 'gap-5 py-4' : 'gap-2'
      }`}
      data-phase={phase}
    >
      <svg
        viewBox="0 0 320 156"
        className={isFull ? 'h-56 w-full max-w-[44rem] sm:h-72' : 'h-28 w-60 sm:h-40 sm:w-[21rem] lg:h-48 lg:w-[25rem]'}
        aria-hidden="true"
      >
        {/* Six concentric perspective ripple rings */}
        <ellipse
          cx="160"
          cy="86"
          rx="132"
          ry="45"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.15"
          opacity="0.16"
          className="settle-ring settle-ring--6"
        />
        <ellipse
          cx="160"
          cy="86"
          rx="110"
          ry="37.5"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.2"
          opacity="0.24"
          className="settle-ring settle-ring--5"
        />
        <ellipse
          cx="160"
          cy="86"
          rx="88"
          ry="30"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.25"
          opacity="0.34"
          className="settle-ring settle-ring--4"
        />
        <ellipse
          cx="160"
          cy="86"
          rx="67"
          ry="23"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.25"
          opacity="0.48"
          className="settle-ring settle-ring--3"
        />
        <ellipse
          cx="160"
          cy="86"
          rx="47"
          ry="16.2"
          fill="none"
          stroke="var(--primary-ink)"
          strokeWidth="1.35"
          opacity="0.64"
          className="settle-ring settle-ring--2"
        />
        <ellipse
          cx="160"
          cy="86"
          rx="29"
          ry="10.2"
          fill="none"
          stroke="var(--primary-ink)"
          strokeWidth="1.45"
          opacity="0.8"
          className="settle-ring settle-ring--1"
        />

        {/* Smooth dark river stone resting at the ripple centre */}
        <path
          d="M144 82 C144 71, 151 64, 160 64 C169 64, 176 71, 176 80 C176 88, 169 93, 160 93 C151 93, 144 89, 144 82 Z"
          fill="var(--pebble-basalt)"
        />
        <path
          d="M150 75 C153 71, 159 69.5, 165 71"
          fill="none"
          stroke="var(--pebble-ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>

      {/* Polite live region for screen readers and quiet visible breathing cue */}
      <div className="min-h-7" role="status" aria-live="polite" aria-atomic="true">
        {cueText ? (
          <p className="font-display text-xl italic text-ink sm:text-2xl">
            {cueText}
            {isRunning ? (
              <span className="ml-2 font-sans text-xs font-semibold not-italic tracking-[0.12em] uppercase text-ink/75">
                {cycle} / {TOTAL_CYCLES}
              </span>
            ) : null}
          </p>
        ) : (
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-ink/75">
            {isFull ? '4 seconds in · 6 seconds out · one minute' : 'In for 4 · out for 6'}
          </p>
        )}
      </div>

      {/* Controls: Take a slow breath / Stop / Restart */}
      <div className="no-print flex flex-wrap items-center justify-center gap-2.5">
        {!isRunning ? (
          <button
            type="button"
            onClick={start}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              isFull
                ? 'border-ink/40 bg-surface text-ink hover:border-ink hover:bg-bg'
                : 'border-ink/35 bg-surface/90 text-ink hover:border-ink hover:bg-surface'
            }`}
          >
            {phase === 'complete' ? 'Restart' : 'Take a slow breath'}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={stop}
              className="rounded-full border border-ink/35 bg-surface/90 px-4 py-1.5 text-sm font-semibold text-ink hover:border-ink"
            >
              Stop
            </button>
            <button
              type="button"
              onClick={start}
              className="rounded-full border border-transparent px-3 py-1.5 text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              Restart
            </button>
          </>
        )}
      </div>

      {/* No-JS graceful caption */}
      <noscript>
        <p className="text-sm text-muted">Breathe in for four, out for six. Repeat a few times.</p>
      </noscript>
    </div>
  );
}
