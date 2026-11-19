import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

const PUBLIC_ROUTES = [
  '/',
  '/approaches/',
  '/clinicians/',
  '/fees/',
  '/urgent-help/',
  '/contact/',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
