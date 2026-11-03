'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Retorna um valor de 0 a 1 representando o quanto do elemento
 * já cruzou a viewport (de cima para baixo).
 * Usa rAF para não bloquear a thread principal.
 */
export function useScrollProgress(threshold = 0.2): {
  ref: React.RefObject<HTMLElement | null>;
  progress: number;
} {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    function update() {
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * threshold;
      const crossed = vh - rect.top;
      const clamped = Math.min(1, Math.max(0, crossed / total));
      setProgress(clamped);
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return { ref, progress };
}
