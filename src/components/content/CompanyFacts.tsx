import { COMPANY, FOUNDER_RONALDO } from '@/config/entity.config';
import { buildSupportMailto } from '@/config/site.config';
import { TEAM_MEMBERS, TEAM_SIGNATURE } from '@/data/team.data';

export function CompanyFacts() {
  return (
    <>
      <section aria-labelledby="equipe-title" className="space-y-3">
        <h2 id="equipe-title" className="text-xl font-bold text-telemetry-text-primary sm:text-2xl">
          Quem são os fundadores do RKT Tennis?
        </h2>
        <ul className="space-y-2 text-sm text-telemetry-text-muted sm:text-base">
          {TEAM_MEMBERS.map((m) => (
            <li key={m.id} id={m.id === 'ronaldo' ? FOUNDER_RONALDO.slug : 'eduardo-figueiredo'}>
              <strong className="text-telemetry-text-primary">{m.name}</strong> — {m.role}
              {m.id === 'ronaldo' && (
                <>
                  {' · '}
                  <a href={FOUNDER_RONALDO.lattesUrl} rel="noopener noreferrer" target="_blank"
                    className="text-telemetry-blue-light underline underline-offset-2">
                    Currículo Lattes
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
        <p className="text-xs text-telemetry-text-muted">{TEAM_SIGNATURE}</p>
      </section>
      <section aria-labelledby="empresa-title" className="space-y-3">
        <h2 id="empresa-title" className="text-xl font-bold text-telemetry-text-primary sm:text-2xl">
          Dados da empresa
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-telemetry-text-muted sm:text-base">
          <dt className="font-semibold text-telemetry-text-primary">Razão social</dt>
          <dd>{COMPANY.legalName} ({COMPANY.brandName})</dd>
          <dt className="font-semibold text-telemetry-text-primary">CNPJ</dt>
          <dd>{COMPANY.cnpj}</dd>
          <dt className="font-semibold text-telemetry-text-primary">Local</dt>
          <dd>{COMPANY.city}, {COMPANY.region}</dd>
          <dt className="font-semibold text-telemetry-text-primary">Suporte</dt>
          <dd>
            <a href={buildSupportMailto()} className="text-telemetry-blue-light underline underline-offset-2">
              {COMPANY.supportEmail}
            </a>
          </dd>
        </dl>
      </section>
    </>
  );
}
