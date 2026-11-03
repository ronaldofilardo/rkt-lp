import Link from 'next/link';
import { SITE_PAGES } from '@/data/content/pages.data';

const LINK_CLASS =
  'text-telemetry-text-muted transition-colors hover:text-telemetry-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue';

/** Bloco "Veja também": desorfaniza páginas de conteúdo com links internos correlatos. */
export function RelatedLinks({ current }: { current: string }) {
  const related = SITE_PAGES.filter((page) => page.path !== current);
  return (
    <nav
      aria-label="Veja também"
      className="mx-auto max-w-3xl px-3 pb-14 sm:px-4 md:pb-20 lg:px-6"
    >
      <div className="border-t border-telemetry-border/10 pt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
          Veja também
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {related.map((page) => (
            <li key={page.path}>
              <Link href={page.path} className={LINK_CLASS}>
                {page.title.split(' | ')[0]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
