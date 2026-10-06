/**
 * Resolves static asset paths (from public/) relative to Vite's configured base URL.
 * Ensures full compatibility with GitHub Pages repository subpaths (e.g. /DigitalStoreLK/),
 * custom root domains (/), and local development.
 */
export function getAssetUrl(path?: string | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
