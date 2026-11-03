import type { ReactNode } from 'react';

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4';
export type HeadingColor = 'primary' | 'muted' | 'volt';

interface HeadingProps {
  /** Elemento HTML renderizado (padrão: h2) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Variante semântica de tamanho */
  variant?: HeadingVariant;
  /** Cor semântica do texto */
  color?: HeadingColor;
  /** ID do elemento (para acessibilidade e âncoras) */
  id?: string;
  /** Conteúdo do heading */
  children: ReactNode;
  /** Classe CSS adicional */
  className?: string;
}

const VARIANT_FONT_SIZE: Record<HeadingVariant, string> = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl',
  h2: 'text-2xl sm:text-3xl',
  h3: 'text-xl sm:text-2xl',
  h4: 'text-lg sm:text-xl',
};

const COLOR_CLASS: Record<HeadingColor, string> = {
  primary: 'text-telemetry-text-primary',
  muted: 'text-telemetry-text-muted',
  volt: 'text-telemetry-volt',
};

export function Heading({
  as = 'h2',
  variant = 'h2',
  color = 'primary',
  id,
  children,
  className = '',
}: HeadingProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      id={id}
      className={`font-display font-extrabold leading-tight tracking-tight ${VARIANT_FONT_SIZE[variant]} ${COLOR_CLASS[color]} ${className}`}
    >
      {children}
    </Tag>
  );
}
