'use client';

import { useEffect, useState } from 'react';
import { pickActiveSection } from '@/lib/scroll-spy';

/** Faixa de observação: abaixo do header fixo até ~40% da altura da viewport. */
const OBSERVE_MARGIN = '-120px 0px -60% 0px';

export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const order = key ? key.split('|') : [];
    const targets = order
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(pickActiveSection(order, visible));
      },
      { rootMargin: OBSERVE_MARGIN, threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
