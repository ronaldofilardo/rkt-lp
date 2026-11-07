import { CredentialCard } from './CredentialCard';

export function CredentialsSection() {
  return (
    <section className="mx-auto max-w-5xl px-3 py-10 sm:px-4 md:py-16 lg:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt mb-8 text-center sm:text-left">
        Credenciais e formação profissional
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CredentialCard
          title="Formação acadêmica"
          body="Professor universitário (graduação e especialização) na PUCPR, lecionando Metodologia de Pesquisa Científica. Autor do livro publicado pela Editora Intersaberes e pesquisas de doutoramento pela Universidade do Porto (Portugal)."
        />
        <CredentialCard
          title="Metodologia STE-DEV"
          body="Engenharia preventiva inspirada na norma aeroespacial ASD-STE100: arquivos limitados a 100 linhas (R-03), complexidade ciclomática < 10, Clean Architecture e eliminação de presunções na geração de código por IA."
        />
        <CredentialCard
          title="Engenharia do RKT Tennis"
          body="Modelagem do motor de regras oficiais ITF/CBT desacoplado (engine.ts), pipeline offline-first no IndexedDB com reconciliação assíncrona e proteção nativa de privacidade (LGPD/ECA) para jovens atletas."
        />
      </div>
    </section>
  );
}

