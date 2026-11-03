import { buildTermsUrl, buildPrivacyUrl, buildSupportMailto } from '@/config/site.config';
import { COMPANY } from '@/config/entity.config';
import { SITE_PAGES } from '@/data/content/pages.data';
import { BrandLogo } from '@/components/telemetry-ui/BrandLogo';

const CURRENT_YEAR = new Date().getFullYear();

const NAV_LINKS = [
  { label: 'Para Atletas', href: '/para-atletas' },
  { label: 'Para Treinadores', href: '/para-treinadores' },
  { label: 'Para Gestores de CT', href: '/para-gestores' },
  { label: 'Como Funciona', href: '/#como-funciona' },
  { label: 'Painel de Telemetria', href: '/#telemetria' },
] as const;

/** Rótulos curtos para a coluna institucional (fonte única: SITE_PAGES). */
const SHORT_LABEL: Record<string, string> = {
  '/sobre': 'Sobre o RKT',
  '/sobre/equipe': 'Equipe',
  '/artigos': 'Artigos Técnicos',
  '/conhecimento': 'Base de Conhecimento',
};

const EXCLUDED_INSTITUTIONAL_PATHS = ['/glossario', '/guia/estatisticas-de-tenis'];
const LINK_CLASS =
  'text-telemetry-text-muted transition-colors hover:text-telemetry-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue';

export function Footer() {
  return (
    <footer className="border-t border-telemetry-border/10 bg-telemetry-base px-3 py-10 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-container space-y-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Coluna 1 — Identidade e confiança */}
          <div className="space-y-3">
            <BrandLogo size="md" href="/" />
            <p className="max-w-xs text-xs leading-relaxed text-telemetry-text-muted">
              Plataforma de inteligência e telemetria para o tênis. Da formação à alta performance.
            </p>
            <p className="font-mono text-[11px] text-telemetry-text-muted">🛡️ Desenvolvido por {COMPANY.brandName} • Desde {COMPANY.foundedYear}</p>
            <a href={buildSupportMailto()} className={`${LINK_CLASS} font-mono text-[11px]`}>
              ✉️ {COMPANY.supportEmail}
            </a>
          </div>

          {/* Coluna 2 — Navegação (atores do ecossistema) */}
          <nav aria-label="Navegação do rodapé" className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">Navegação</p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 3 — Institucional e autoridade de conteúdo */}
          <nav aria-label="Institucional do rodapé" className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">Institucional</p>
            <ul className="space-y-2 text-sm">
              {SITE_PAGES.map((page) =>
                page.path.startsWith('/para-') ||
                EXCLUDED_INSTITUTIONAL_PATHS.includes(page.path)
                  ? null
                  : (
                    <li key={page.path}>
                      <a href={page.path} className={LINK_CLASS}>
                        {SHORT_LABEL[page.path] ?? page.title.split(' | ')[0]}
                      </a>
                    </li>
                  ),
              )}
            </ul>
            <div className="rounded-lg border border-telemetry-border/10 bg-telemetry-card/50 p-3 text-xs leading-relaxed text-telemetry-text-muted">
              O RKT faz parte da {COMPANY.legalName} · CNPJ {COMPANY.cnpj}
            </div>
          </nav>
        </div>

        {/* Barra inferior (sub-rodapé) */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-telemetry-border/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] text-telemetry-text-muted">
            © {CURRENT_YEAR} RKT · {COMPANY.legalName} · {COMPANY.city}, {COMPANY.region} 🎾 Todos
            os direitos reservados.
          </p>
          <p className="flex gap-4 font-mono text-[10px]">
            <a href={buildTermsUrl()} className={LINK_CLASS}>
              Termos de Uso
            </a>
            <a href={buildPrivacyUrl()} className={LINK_CLASS}>
              Privacidade
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
