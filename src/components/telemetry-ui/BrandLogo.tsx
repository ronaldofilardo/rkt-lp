import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site.config';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BrandLogoProps {
  size?: LogoSize;
  href?: string;
  className?: string;
  priority?: boolean;
}

const SIZES = {
  sm: { width: 36, height: 36, className: 'h-8 sm:h-9 w-auto' },
  md: { width: 48, height: 48, className: 'h-10 sm:h-12 w-auto' },
  lg: { width: 72, height: 72, className: 'h-16 sm:h-20 w-auto' },
  xl: { width: 96, height: 96, className: 'h-24 w-auto' },
} as const;

export function BrandLogo({
  size = 'md',
  href = '/',
  className = '',
  priority = true,
}: BrandLogoProps) {
  const config = SIZES[size];

  const imageElement = (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <Image
        src="/brand/logo.png"
        alt={SITE_CONFIG.name}
        width={config.width}
        height={config.height}
        className={`${config.className} object-contain drop-shadow-sm transition-transform duration-200 hover:scale-105`}
        priority={priority}
      />
      <span className="sr-only">{SITE_CONFIG.name}</span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center shrink-0 rounded-radius-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-telemetry-volt"
        aria-label={`${SITE_CONFIG.name} — início`}
      >
        {imageElement}
      </Link>
    );
  }

  return imageElement;
}
