'use client';

/**
 * ReportModal.tsx
 * Modal com a imagem da timeline da partida demonstrativa.
 * Abre ao clicar em "Ver relatório desta partida" — disponível a qualquer
 * momento, independente de onde o replay estiver no loop.
 *
 * Comportamento:
 *   - Fecha com X, tecla Escape ou clique no backdrop
 *   - Foco aprisionado dentro do modal enquanto aberto (a11y)
 *   - Scroll interno na imagem (mobile-friendly)
 *   - prefers-reduced-motion: sem transição de entrada/saída
 */

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { buildSignupUrl } from '@/config/site.config';

interface Props {
  onClose: () => void;
}

const SIGNUP_URL = buildSignupUrl({ origem: 'lp_relatorio' });

export function ReportModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  /* Fecha com Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();

      /* Aprisiona o foco: Tab / Shift+Tab circula entre fechar e CTA */
      if (e.key === 'Tab') {
        const focusable = [closeButtonRef.current, ctaButtonRef.current].filter(
          Boolean,
        ) as HTMLElement[];
        if (focusable.length < 2) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    /* Bloqueia scroll do body */
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    /* Foco inicial no botão de fechar */
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [handleKeyDown]);

  /* Fecha ao clicar no backdrop (overlay), não no conteúdo */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    /* Backdrop */
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Relatório da partida demonstrativa"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      style={{ animation: 'tab-fade-in var(--rkt-dur-base) var(--rkt-ease-rally) both' }}
    >
      {/* Painel do modal */}
      <div
        className="relative flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-telemetry-border/10 bg-telemetry-card shadow-telemetry-float"
        style={{ animation: 'reveal-up var(--rkt-dur-slow) var(--rkt-ease-rally) both' }}
      >
        {/* ── Cabeçalho ─────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between border-b border-telemetry-border/10 px-5 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-volt">
              Dados reais · Partida demonstrativa
            </p>
            <h2 className="text-sm font-semibold text-telemetry-text-primary">
              Timeline da partida
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Fechar relatório"
            className="flex h-8 w-8 items-center justify-center rounded-full text-telemetry-text-muted transition-colors hover:bg-telemetry-elevated hover:text-telemetry-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Imagem scrollável ──────────────────────────────── */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Image
            src="/timeline-RKTapp.png"
            alt="Timeline completa da partida demonstrativa registrada no RKT"
            width={1200}
            height={2400}
            className="w-full"
            priority
            sizes="(max-width: 672px) 100vw, 672px"
          />
        </div>

        {/* ── Rodapé com CTA ────────────────────────────────── */}
        <div className="shrink-0 border-t border-telemetry-border/10 bg-telemetry-card px-5 py-4">
          <p className="mb-3 text-sm text-telemetry-text-muted">
            Cada partida registrada no RKT gera esta timeline automaticamente.
          </p>
          <a
            ref={ctaButtonRef}
            href={SIGNUP_URL}
            className="inline-flex items-center gap-2 rounded-full bg-telemetry-volt px-5 py-2.5 font-mono text-sm font-semibold text-telemetry-base transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-volt"
          >
            Criar conta grátis
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
