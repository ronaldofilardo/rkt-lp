import { RONALDO_LEAD } from './content/ronaldo.data';
import { FOUNDER_RONALDO, FOUNDER_EDUARDO } from '@/config/entity.config';

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly slug: string;
  readonly bio?: string;
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: 'ronaldo',
    name: 'Ronaldo Filardo',
    role: 'Fundador & Desenvolvimento',
    initials: 'RF',
    slug: FOUNDER_RONALDO.slug,
    bio: RONALDO_LEAD,
  },
  {
    id: 'eduardo',
    name: 'Eduardo Figueiredo',
    role: 'Fundador & Produto',
    initials: 'EF',
    slug: FOUNDER_EDUARDO.slug,
  },
] as const;

export const TEAM_SIGNATURE = 'Desenvolvido por Omni Sistemas · Be Smart' as const;
