/**
 * Define a seção ativa a partir das seções que cruzam a faixa de observação.
 * Em caso de duas seções simultâneas, vence a que vem depois na ordem da página
 * (a que está entrando). Sem interseção, nenhuma seção do menu está ativa.
 */
export function pickActiveSection(
  orderedIds: readonly string[],
  intersecting: ReadonlySet<string>,
): string | null {
  for (let i = orderedIds.length - 1; i >= 0; i--) {
    if (intersecting.has(orderedIds[i])) return orderedIds[i];
  }
  return null;
}

export function hashToId(href: string): string {
  return href.startsWith('#') ? href.slice(1) : href;
}
