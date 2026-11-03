import type { ReactNode } from 'react';

export type TextVariant = 'body' | 'body-small' | 'caption';
export type TextColor = 'primary' | 'muted' | 'volt' | 'inverse';

interface TextProps {
  /** Elemento HTML renderizado (padrão: p) */
  as?: 'p' | 'span' | 'div';
  /** Variante semântica de tamanho */
  variant?: TextVariant;
  /** Cor semântica do texto */
  color?: TextColor;
  /** Conteúdo do texto */
  children: ReactNode;
  /** Classe CSS adicional */
  className?: string;
}

const VARIANT_FONT_SIZE: Record<TextVariant, string> = {
  body: 'text-base leading-relaxed sm:text-lg',
  'body-small': 'text-sm leading-relaxed sm:text-base',
  caption: 'text-xs leading-relaxed',
};

const COLOR_CLASS: Record<TextColor, string> = {
  primary: 'text-telemetry-text-primary',
  muted: 'text-telemetry-text-muted',
  volt: 'text-telemetry-volt',
  inverse: 'text-white',
};

export function Text({
  as = 'p',
  variant = 'body',
  color = 'primary',
  children,
  className = '',
}: TextProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag className={`${VARIANT_FONT_SIZE[variant]} ${COLOR_CLASS[color]} ${className}`}>
      {children}
    </Tag>
  );
}
