/**
 * Prepends Vite's BASE_URL to public asset paths.
 * Required for consistent asset resolution across environments.
 * base is set to '/' in vite.config.js for Cloudflare Workers deployment.
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
