import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_CONFIG, TITLE_SUFFIX, getCanonicalUrl } from '@/config/site.config';
import { SEO } from '@/config/seo.config';
import { buildOrganizationSchema } from '@/lib/seo-schema-pages';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import {
  buildSoftwareApplicationSchema,
  serializeJsonLd,
} from '@/lib/seo-schema';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0F1D' },
    { media: '(prefers-color-scheme: light)', color: '#F1F5F9' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const SEO_IMAGE = {
  url: SEO.ogImage.path,
  width: SEO.ogImage.width,
  height: SEO.ogImage.height,
  alt: SEO.ogImage.alt,
};

export const metadata: Metadata = {
  metadataBase: new URL(getCanonicalUrl()),
  title: {
    default: 'RKT | Telemetria e Inteligência Tática no Tênis',
    template: `%s${TITLE_SUFFIX}`,
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_CONFIG.seoTitle,
    description: SITE_CONFIG.description,
    url: getCanonicalUrl(),
    siteName: SITE_CONFIG.name,
    locale: 'pt_BR',
    type: 'website',
    images: [SEO_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.seoTitle,
    description: SITE_CONFIG.description,
    images: [SEO_IMAGE],
  },
  icons: {
    icon: [
      { url: '/brand/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildSoftwareApplicationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildOrganizationSchema()) }}
        />
      </head>
      <body className="min-h-screen bg-telemetry-base text-telemetry-text-primary antialiased selection:bg-telemetry-volt selection:text-black">
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}

