'use client';

import { useState, useEffect } from 'react';
import { SITE_CONFIG, buildLoginUrl, buildSignupUrl } from '@/config/site.config';
import { BrandLogo } from '@/components/telemetry-ui/BrandLogo';
import { ThemeToggle } from '@/components/telemetry-ui/ThemeToggle';
import { HeaderNav } from './HeaderNav';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-telemetry-border/10 transition-all duration-200 ease-out ${
        scrolled
          ? 'bg-telemetry-base/95 backdrop-blur-lg shadow-sm py-0.5'
          : 'bg-telemetry-base/80 backdrop-blur-md py-1.5'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-telemetry-blue focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3 sm:px-4 md:flex-nowrap lg:px-6">
        <BrandLogo size="md" href="/" priority />
        <HeaderNav links={SITE_CONFIG.navLinks} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={buildLoginUrl()}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-telemetry-text-muted transition-colors hover:text-telemetry-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
          >
            Entrar
          </a>
          <a
            href={buildSignupUrl({ origem: 'lp_header' })}
            className="rounded-full bg-telemetry-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-telemetry-blue-light active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue-light"
          >
            Criar conta
          </a>
        </div>
      </div>
    </header>
  );
}
