import type { Metadata } from 'next';
import { ProfilePage } from '@/components/content/ProfilePage';
import { PROFILE_PAGES } from '@/data/content/profiles.data';
import { buildPageMetadata } from '@/lib/page-metadata';

const DATA = PROFILE_PAGES.find((p) => p.slug === 'atletas')!;

export const metadata: Metadata = buildPageMetadata(DATA);

export default function Page() {
  return <ProfilePage data={DATA} />;
}
