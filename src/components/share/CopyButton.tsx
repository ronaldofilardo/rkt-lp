'use client';

import { useState } from 'react';
import { LinkIcon, CheckIcon } from './ShareIcons';

const REF_URL = 'https://rkt-app.com/?ref=compartilhar';

function copyLink(): Promise<void> {
  return navigator.clipboard.writeText(REF_URL);
}

interface Props {
  onStatusChange: (status: string) => void;
}

export function CopyButton({ onStatusChange }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await copyLink();
      setCopied(true);
      onStatusChange('Link copiado com sucesso!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onStatusChange('Não foi possível copiar automaticamente — selecione o link abaixo.');
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="relative rounded-full bg-telemetry-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-telemetry-blue-light active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue-light"
      aria-label={copied ? 'Link copiado' : 'Copiar link do RKT'}
    >
      <span className="flex items-center justify-center transition-opacity duration-200 ease-out">
        {copied ? <CheckIcon /> : <LinkIcon />}
        <span>{copied ? 'Copiado!' : 'Copiar link do RKT'}</span>
      </span>
    </button>
  );
}