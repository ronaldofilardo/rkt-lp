/** Crawlers de busca e de IA/LLM liberados no robots.txt (exceto /api/). */
export const ALLOWED_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAISearchBot',
  'Google-Extended',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Bingbot',
  'Amazonbot',
  'Applebot',
] as const;

export const DISALLOWED_PATHS = ['/api/'] as const;
