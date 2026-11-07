'use client';

import { useEffect, useRef } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { hashToId } from '@/lib/scroll-spy';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

export function HeaderNav({ links }: { links: readonly NavItem[] }) {
  const navRef = useRef<HTMLElement>(null);
  const active = useActiveSection(links.map((link) => hashToId(link.href)));

  // No mobile o menu rola na horizontal: mantém o item ativo visível.
  useEffect(() => {
    const nav = navRef.current;
    const item = active ? nav?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    if (!nav || !item) return;
    const left = item.offsetLeft - (nav.clientWidth - item.clientWidth) / 2;
    nav.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label="Seções da página"
      className="header-nav relative order-last -mx-3 flex w-[calc(100%+1.5rem)] gap-1 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:-mx-4 sm:w-[calc(100%+2rem)] sm:px-4 md:order-none md:mx-0 md:w-auto md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
    >
      {links.map((link) => {
        const id = hashToId(link.href);
        const isActive = active === id;
        return (
          <a
            key={id}
            data-id={id}
            href={link.href}
            aria-current={isActive ? 'location' : undefined}
            className={`nav-link relative shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue ${
              isActive
                ? 'nav-active bg-telemetry-active text-telemetry-text-primary shadow-[0_0_8px_rgba(204,255,0,0.15)]'
                : 'text-telemetry-text-muted hover:text-telemetry-text-primary hover:bg-telemetry-border/5'
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
