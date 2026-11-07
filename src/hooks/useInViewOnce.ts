'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Marca `true` na primeira vez que o elemento entra na viewport e desconecta
 * o observer. Diferente de `useActiveSection`, não reage à saída: animações
 * de entrada não devem ser reexecutadas ao rolar de volta para cima.
 *
 * Sem `IntersectionObserver` (SSR, teste, browser antigo) o retorno é `true`
 * desde o início, preservando o conteúdo visível — nunca começa oculto.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
): { ref: React.RefObject<T>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
