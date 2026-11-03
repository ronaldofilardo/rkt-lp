import { TEAM_MEMBERS, TEAM_SIGNATURE } from '@/data/team.data';

function MemberCard({ name, role, initials }: { name: string; role: string; initials: string }) {
  return (
    <div className="team-card flex flex-col items-center gap-3 text-center opacity-0">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-telemetry-border/10 bg-telemetry-card font-display text-xl font-bold text-telemetry-volt">
        {initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-telemetry-text-primary">{name}</p>
        <p className="text-xs text-telemetry-text-muted">{role}</p>
      </div>
    </div>
  );
}

export function Team() {
  return (
    <section
      aria-labelledby="team-title"
      className="border-b border-telemetry-border/10 bg-telemetry-surface px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container space-y-10 text-center">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">Equipe</p>
          <h2 id="team-title" className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl">
            Quem está por trás do RKT
          </h2>
        </header>

        <div className="team-group flex justify-center gap-12 sm:gap-20">
          {TEAM_MEMBERS.map((m) => (
            <MemberCard key={m.id} name={m.name} role={m.role} initials={m.initials} />
          ))}
        </div>

        <p className="font-mono text-xs text-telemetry-text-muted">{TEAM_SIGNATURE}</p>
      </div>
    </section>
  );
}
