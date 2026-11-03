import type { ReactNode } from 'react';

interface LabelProps {
  /** ID do elemento ao qual o rótulo está associado */
  htmlFor: string;
  /** Conteúdo do rótulo */
  children: ReactNode;
  /** Classe CSS adicional */
  className?: string;
}

export function Label({ htmlFor, children, className = '' }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`font-mono text-xs uppercase tracking-widest text-telemetry-volt ${className}`}>
      {children}
    </label>
  );
}
