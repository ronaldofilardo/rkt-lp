import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/content/JsonLd';
import { buildFaqPageSchema, buildWebSiteSchema } from '@/lib/seo-schema';
import { Hero } from '@/components/hero/Hero';
import { KeyTakeaways } from '@/components/takeaways/KeyTakeaways';
import { TelemetryPillars } from '@/components/pillars/TelemetryPillars';
import { HowItWorks } from '@/components/how-it-works/HowItWorks';
import { TargetAudience } from '@/components/audience/TargetAudience';
import { TelemetryDemo } from '@/components/telemetry-demo/TelemetryDemo';
import { Paixao } from '@/components/emotional/Paixao';
import { ShareBlock } from '@/components/share/ShareBlock';
import { FAQ } from '@/components/faq/FAQ';
import { ConhecimentoArtigos } from '@/components/knowledge/ConhecimentoArtigos';
import { FinalCTA } from '@/components/cta/FinalCTA';
import { MobileStickyCTA } from '@/components/cta/MobileStickyCTA';
import { Footer } from '@/components/footer/Footer';
import { TennisBallRain } from '@/components/effects/TennisBallRain';

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildWebSiteSchema()} />
      <JsonLd data={buildFaqPageSchema()} />
      <Header />
      <main id="conteudo">
        <Hero />
        <KeyTakeaways />
        <Paixao />
        <TelemetryPillars />
        <HowItWorks />
        <TargetAudience />
        <TelemetryDemo />
        <ShareBlock />
        <FAQ />
        <ConhecimentoArtigos />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
      <TennisBallRain targetIds={['paixao', 'conhecimento-artigos']} />
    </>
  );
}
