import Link from 'next/link';
import React from 'react';
import type { ReactNode } from 'react';
import { buildSignupUrl } from '@/config/site.config';
import { BrandLogo } from '@/components/telemetry-ui/BrandLogo';
import { ThemeToggle } from '@/components/telemetry-ui/ThemeToggle';
import { Footer } from '@/components/footer/Footer';
import { RelatedLinks } from './RelatedLinks';

export function ContentShell({ path, children }: { path: string; children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-telemetry-border/10 bg-telemetry-base/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-container items-center justify-between gap-3 px-3 py-2 sm:px-4 lg:px-6">
          <BrandLogo size="md" href="/" priority />
          <nav aria-label="Navegação principal" className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-telemetry-text-muted transition-colors hover:text-telemetry-text-primary"
            >
              Início
            </Link>
            <ThemeToggle />
            <a
              href={buildSignupUrl({ origem: 'lp_content_header' })}
              className="rounded-full bg-telemetry-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-telemetry-blue-light"
            >
              Criar conta
            </a>
          </nav>
        </div>
      </header>
      <main id="conteudo">
        {children}
        <RelatedLinks current={path} />
      </main>
      <Footer />
    </>
  );
}
