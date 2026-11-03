import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-telemetry-base">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-radius-lg bg-telemetry-card border border-telemetry-border/10">
        <div className="inline-block px-3 py-1 rounded-radius-pill bg-telemetry-alert/10 text-telemetry-alert border border-telemetry-alert/20 font-mono text-xs">
          ERRO 404
        </div>
        <h1 className="text-2xl font-bold text-telemetry-text-primary">
          Página não encontrada
        </h1>
        <p className="text-sm text-telemetry-text-muted">
          O recurso que você tentou acessar não está disponível na Landing Page da RKT Tennis.
        </p>
        <div>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-radius-pill bg-telemetry-blue hover:bg-telemetry-blue-light text-white text-sm font-medium transition-all"
          >
            Retornar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

