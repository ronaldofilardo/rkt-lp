export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'rkt-lp-theme';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

export function resolveTheme(stored: unknown, systemPrefersLight: boolean): Theme {
  if (isTheme(stored)) return stored;
  return systemPrefersLight ? 'light' : 'dark';
}

export function oppositeTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}

/** Executado no <head> antes da hidratação para evitar flash de tema. */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
