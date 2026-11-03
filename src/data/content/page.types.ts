export type OgType = 'website' | 'article' | 'profile';

export interface PageMeta {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  /** `og:type` da página. Padrão `website`; `article` para guias e `profile` para pessoas. */
  readonly ogType?: OgType;
}

export interface QaItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const CONTENT_LAST_UPDATED = '2026-11-02';
