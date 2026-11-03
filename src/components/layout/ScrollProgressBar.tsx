'use client';

import { useEffect, useState } from 'react';

/**
 * Barra de progresso de rolagem vertical inspirada no OS-LP.
 * Usa animation-timeline: scroll(root) nativo do CSS no compositor,
 * com fallback dinâmico via JS para navegadores mais antigos.
 * O track de fundo permite ao usuário identificar quanto resta até o final da página
 * em ambos os temas (escuro e claro) sem ficar invisível.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [hasCssScrollTimeline, setHasCssScrollTimeline] = useState(false);

  useEffect(() => {
    // Detecta se CSS scroll-timeline é suportado nativamente
    if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'scroll()')) {
      setHasCssScrollTimeline(true);
      return;
    }

    let rafId = 0;

    function handleScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollable = docHeight - winHeight;

      if (scrollable > 0) {
        const current = Math.min(1, Math.max(0, scrollY / scrollable));
        setProgress(current);
      } else {
        setProgress(0);
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    }

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="scroll-progress-track fixed top-0 left-0 right-0 z-[100] h-[3.5px] w-full pointer-events-none"
    >
      <div
        className="scroll-progress-fill h-full w-full origin-left transition-transform duration-75 ease-out"
        style={hasCssScrollTimeline ? undefined : { transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
