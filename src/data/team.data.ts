export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: 'ronaldo',
    name: 'Ronaldo Filardo',
    role: 'Fundador & Engenharia',
    initials: 'RF',
  },
  {
    id: 'eduardo',
    name: 'Eduardo Figueiredo',
    role: 'Fundador & Produto',
    initials: 'EF',
  },
] as const;

export const TEAM_SIGNATURE = 'Desenvolvido por Omni Sistemas · Be Smart' as const;
