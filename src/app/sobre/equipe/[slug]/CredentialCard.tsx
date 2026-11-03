export function CredentialCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-6">
      <h3 className="text-lg font-bold text-telemetry-text-primary mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-telemetry-text-muted">{body}</p>
    </div>
  );
}
