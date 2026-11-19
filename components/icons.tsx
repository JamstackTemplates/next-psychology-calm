import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.35,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
};

/** Phone handset in fine lakeside line style. */
export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} {...base} {...props}>
      <path d="M5.2 3.4h2.5l1.1 3.4-1.6 1.3a10.4 10.4 0 0 0 4.7 4.7l1.3-1.6 3.4 1.1v2.5c0 .9-.7 1.6-1.6 1.6C8.8 16.4 3.6 11.2 3.6 5c0-.9.7-1.6 1.6-1.6Z" />
    </svg>
  );
}

/** Envelope icon. */
export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} {...base} {...props}>
      <rect x="2.8" y="4.5" width="14.4" height="11" rx="2" />
      <path d="m3.6 5.6 6.4 4.8 6.4-4.8" />
    </svg>
  );
}

/** Stone marker resting on a water ripple. */
export function LocationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} {...base} {...props}>
      <ellipse cx="10" cy="15.4" rx="6.2" ry="2" opacity="0.6" />
      <path d="M10 14.2c3-2.9 4.6-5.2 4.6-7.4a4.6 4.6 0 1 0-9.2 0c0 2.2 1.6 4.5 4.6 7.4Z" />
      <circle cx="10" cy="6.8" r="1.4" />
    </svg>
  );
}

/** Ripple clock dial. */
export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} {...base} {...props}>
      <circle cx="10" cy="10" r="7.2" />
      <circle cx="10" cy="10" r="4.2" opacity="0.35" />
      <path d="M10 6.3V10l2.6 1.6" />
    </svg>
  );
}

/** Window with ripple for telehealth sessions. */
export function TelehealthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} {...base} {...props}>
      <rect x="2.6" y="3.8" width="14.8" height="10.4" rx="2" />
      <path d="M6.8 16.8h6.4" />
      <ellipse cx="10" cy="9.4" rx="3.8" ry="1.5" opacity="0.7" />
      <circle cx="10" cy="9.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Step-free access path icon. */
export function AccessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} {...base} {...props}>
      <path d="M3 15.2 17 15.2" />
      <path d="M3.5 13.2 12.2 8.2h4.3" />
      <circle cx="8" cy="6" r="1.4" />
    </svg>
  );
}

/** Closed shell icon for privacy note. */
export function PrivacyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} {...base} {...props}>
      <path d="M3.5 12.5c0-4.4 2.9-7.8 6.5-7.8s6.5 3.4 6.5 7.8c0 1.8-2.4 3-6.5 3s-6.5-1.2-6.5-3Z" />
      <path d="M6.8 12.2c.4-2.5 1.6-4.4 3.2-4.4s2.8 1.9 3.2 4.4" opacity="0.7" />
      <path d="M10 4.7v10.8" opacity="0.45" />
    </svg>
  );
}

/** Small lakeside lamp icon used beside the header Urgent help link. */
export function LampIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={16} height={16} {...base} {...props}>
      <path d="M6.8 6.2h6.4l-.8 6.2H7.6l-.8-6.2Z" />
      <path d="M5.6 6.2 10 3.4l4.4 2.8" />
      <path d="M10 12.4v4.4M7.4 16.8h5.2" />
      <circle cx="10" cy="9.3" r="1.3" fill="currentColor" stroke="none" opacity="0.85" />
    </svg>
  );
}

/** Minimal menu trigger icon. */
export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} {...base} {...props}>
      <path d="M3.5 6.2h13M3.5 10h13M5.5 13.8h9" />
    </svg>
  );
}
