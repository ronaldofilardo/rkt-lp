'use client';

import { useEffect, useRef, useState } from 'react';
import { buildSignupUrl } from '@/config/site.config';

/**
 * Botão fixo inferior: aparece após o usuário rolar além do Hero.
 * Visível apenas em telas <768px (md:hidden).
 * pb-safe garante espaçamento em iPhones com home indicator.
 * prefers-reduced-motion: sem transição, aparece direto.
 */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel: posicionado no final do Hero */}
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none h-px" />

      <div
        aria-hidden={!visible}
        className={`sticky-cta fixed inset-x-0 bottom-0 z-40 md:hidden ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} pb-safe transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none`}
      >
        <div className="border-t border-telemetry-border/10 bg-telemetry-base/90 px-3 py-3 backdrop-blur-md">
          <a
            href={buildSignupUrl({ origem: 'lp_sticky_cta' })}
            tabIndex={visible ? 0 : -1}
            className="block w-full rounded-full bg-telemetry-blue py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-telemetry-blue-light active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue-light"
          >
            Criar conta
          </a>
        </div>
      </div>
    </>
  );
}
