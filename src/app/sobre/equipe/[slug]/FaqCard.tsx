export function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border border-telemetry-border/10 bg-telemetry-card p-5">
      <h4 className="text-sm font-bold text-telemetry-text-primary mb-1">{question}</h4>
      <p className="text-xs leading-relaxed text-telemetry-text-muted">{answer}</p>
    </div>
  );
}
