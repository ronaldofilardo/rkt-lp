interface SectionPlaceholderProps {
  id: string;
  label: string;
  stage: number;
}

/** TEMPORÁRIO: ocupa o lugar das seções reais; cada etapa remove um destes. */
export function SectionPlaceholder({ id, label, stage }: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      className="flex min-h-[70vh] items-center justify-center border-b border-telemetry-border/10 px-3 py-12 md:py-16 lg:py-24"
    >
      <div className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-5 text-center sm:p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
          Etapa {stage} · em construção
        </p>
        <h2 className="mt-2 text-2xl font-bold">{label}</h2>
        <p className="mt-1 text-sm text-telemetry-text-muted">#{id}</p>
      </div>
    </section>
  );
}
