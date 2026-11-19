'use client';

import { useEffect, useRef } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { RippleMark } from './artwork';
import { LampIcon, MenuIcon } from './icons';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/approaches/', label: 'Approaches' },
  { href: '/clinicians/', label: 'Clinicians' },
  { href: '/fees/', label: 'Fees & rebates' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close the mobile popover if the viewport widens past desktop breakpoint
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 64rem)');
    const onChange = () => {
      if (mql.matches && popoverRef.current?.matches(':popover-open')) {
        popoverRef.current.hidePopover();
      }
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  function closePopover() {
    if (popoverRef.current?.matches(':popover-open')) {
      popoverRef.current.hidePopover();
    }
  }

  return (
    <header className="site-header">
      <div className="wrap flex min-h-[4.75rem] items-center justify-between gap-3 py-3">
        {/* Wordmark */}
        <SiteLink
          href="/"
          className="group inline-flex items-center gap-2.5 no-underline hover:no-underline"
        >
          <RippleMark className="hidden h-7 w-9 shrink-0 min-[400px]:block transition-transform duration-300 group-hover:scale-[1.04]" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.3rem] font-normal whitespace-nowrap italic tracking-[-0.01em] text-ink sm:text-[1.5rem]">
              {business.wordmark.primary}
            </span>
            <span className="mt-0.5 text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-muted">
              {business.wordmark.secondary}
            </span>
          </span>
        </SiteLink>

        {/* Right group: single semantic primary nav + Urgent help (always visible) + theme toggle + CTA */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          <nav aria-label="Main" className="flex items-center">
            {/* Desktop inline nav links */}
            <ul className="hidden list-none items-center gap-6 p-0 m-0 text-[0.9375rem] font-medium text-ink lg:flex">
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    markCurrent="page"
                    className="py-1.5 text-ink/90 transition-colors hover:text-primary-ink hover:underline"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>

            {/* Mobile native popover menu */}
            <div
              ref={popoverRef}
              id="site-nav-popover"
              popover="auto"
              className="site-nav-popover lg:hidden"
            >
              <p className="eyebrow mb-3">Navigate</p>
              <ul className="list-none space-y-1 p-0 m-0">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <SiteLink
                      href={item.href}
                      markCurrent="page"
                      onClick={closePopover}
                      className="block rounded-[var(--radius-ui)] px-2 py-2.5 font-display text-xl text-ink no-underline hover:bg-bg hover:underline"
                    >
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-line pt-4">
                <SiteLink
                  href="/contact/"
                  onClick={closePopover}
                  className="button w-full text-center"
                >
                  Make a first enquiry
                </SiteLink>
              </div>
            </div>
          </nav>

          {/* Separate Urgent help utility link — always visible on mobile outside the menu */}
          <SiteLink
            href="/urgent-help/"
            markCurrent="page"
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[0.84rem] font-semibold text-clay no-underline hover:underline"
          >
            <LampIcon className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Urgent help</span>
          </SiteLink>

          <DarkModeToggle />

          {/* Desktop primary CTA */}
          <SiteLink
            href="/contact/"
            className="button hidden text-sm lg:inline-flex"
          >
            Make a first enquiry
          </SiteLink>

          {/* Mobile popover trigger */}
          <button
            type="button"
            popoverTarget="site-nav-popover"
            popoverTargetAction="toggle"
            aria-controls="site-nav-popover"
            aria-label="Open menu"
            className="site-menu-trigger inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line-solid bg-surface px-3 text-sm font-semibold text-ink hover:bg-sand-deep lg:hidden"
          >
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Menu</span>
          </button>
        </div>
      </div>

      {/* Tranquil waterline: the header's sand edge laps gently over the page below,
          with a fainter echo ripple, matching the shorelines between bands */}
      <svg
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        className="art-hide-print pointer-events-none absolute inset-x-0 top-full block h-5 w-full sm:h-8"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="header-echo" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--sage)" stopOpacity="0" />
            <stop offset="0.2" stopColor="var(--sage)" stopOpacity="0.7" />
            <stop offset="0.8" stopColor="var(--sage)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--sage)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 H1440 V9 C1350 13, 1260 4, 1080 10 C900 16, 720 4, 540 10 C360 16, 180 4, 0 10 Z"
          fill="var(--bg)"
        />
        <path
          d="M0 10 C180 4, 360 16, 540 10 C720 4, 900 16, 1080 10 C1260 4, 1350 13, 1440 9"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.28"
          strokeWidth="1.15"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 22 C200 17, 380 27, 600 21 C820 15, 1000 27, 1220 21 C1320 18, 1400 22, 1440 21"
          fill="none"
          stroke="url(#header-echo)"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </header>
  );
}
