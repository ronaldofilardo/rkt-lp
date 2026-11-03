import { TEAM_MEMBERS } from '@/data/team.data';

export function bioForSlug(slug: string) {
  const member = TEAM_MEMBERS.find((m) => m.slug === slug);
  if (!member) return null;
  return { member };
}
