/**
 * Prepends Vite's BASE_URL to public asset paths.
 * Required because vite.config.js sets base: '/Advithiya-website/'
 * for GitHub Pages deployment. Without this, absolute paths like
 * '/assets/images/foo.png' resolve to the site root instead of
 * the sub-path, causing 404s in production (and in local dev when
 * the base is set).
 *
 * Usage:
 *   import { assetPath } from '../utils/assetPath';
 *   <img src={assetPath('images/foo.png')} />
 *   backgroundImage: `url(${assetPath('images/foo.png')})`
 */
export const assetPath = (path) => {
  // import.meta.env.BASE_URL is injected by Vite at build time.
  // It equals '/' in dev with no base, or '/Advithiya-website/' in production.
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // strip trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}/assets${cleanPath}`;
};
