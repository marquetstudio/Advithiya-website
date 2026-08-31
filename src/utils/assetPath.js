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
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  let cleanPath = path;
  if (cleanPath.startsWith('/assets/')) {
    cleanPath = cleanPath.slice('/assets'.length);
  } else if (cleanPath.startsWith('assets/')) {
    cleanPath = cleanPath.slice('assets'.length);
  }
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  return `${base}/assets${cleanPath}`;
};

export const getAssetUrl = assetPath;
export default assetPath;
