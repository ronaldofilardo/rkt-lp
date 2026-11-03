import { RONALDO_LEAD } from './content/ronaldo.data';

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly bio?: string;
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: 'ronaldo',
    name: 'Ronaldo Filardo',
    role: 'Fundador & Engenharia',
    initials: 'RF',
    bio: RONALDO_LEAD,
  },
  {
    id: 'eduardo',
    name: 'Eduardo Figueiredo',
    role: 'Fundador & Produto',
    initials: 'EF',
  },
] as const;

export const TEAM_SIGNATURE = 'Desenvolvido por Omni Sistemas · Be Smart' as const;
