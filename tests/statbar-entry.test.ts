import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('StatBar.tsx começa em 0% e preenche apenas quando ativado por useInViewOnce', () => {
  const statBarPath = 'src/components/telemetry-demo/StatBar.tsx';
  assert.ok(existsSync(join(root, statBarPath)), 'StatBar.tsx deve existir');

  const src = read(statBarPath);

  // Verifica integração do hook useInViewOnce
  assert.ok(src.includes("import { useInViewOnce } from '@/hooks/useInViewOnce'"), 'deve importar useInViewOnce');
  assert.ok(src.includes('const { ref, inView } = useInViewOnce'), 'deve instanciar useInViewOnce');

  // Garante que a largura calculada inicia em 0% antes de inView
  assert.ok(src.includes("inView ? `${p1Pct}%` : '0%'"), 'deve alternar de 0% para a porcentagem real');

  // Garante transição suave e controlada por CSS nativo
  assert.ok(src.includes('transition-[width]'), 'deve usar transition-[width]');
  assert.ok(src.includes('duration-[520ms]'), 'duração de 520ms alinhada ao orçamento de motion');

  // Garante que o contêiner tem ref anexada
  assert.ok(src.includes('ref={ref}'), 'deve repassar a ref para o elemento observado');

  // Acessibilidade sem regressão
  assert.ok(src.includes('aria-label'), 'deve ter atributo aria-label');
});
