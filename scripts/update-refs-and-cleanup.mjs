import { readdir, readFile, writeFile, unlink, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS_DIR = join(ROOT, 'public', 'assets');
const SRC_DIR = join(ROOT, 'src');

// Files that were NOT converted (logos kept as PNG)
const SKIPPED = [
  'advithiya_logo', 'brand_logo', 'advithiya_monogram'
];

// Collect all webp files that were created
async function getWebpFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const fp = join(dir, e.name);
    if (e.isDirectory()) files.push(...await getWebpFiles(fp));
    else if (e.name.endsWith('.webp')) files.push(e.name.replace('.webp', ''));
  }
  return files;
}

// Get all source files to update
async function getSrcFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const fp = join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules') files.push(...await getSrcFiles(fp));
    else if (/\.(jsx?|tsx?|css|html)$/.test(e.name)) files.push(fp);
  }
  return files;
}

async function updateSourceFiles(convertedBasenames) {
  const srcFiles = await getSrcFiles(SRC_DIR);
  let totalReplacements = 0;

  for (const file of srcFiles) {
    let content = await readFile(file, 'utf8');
    let changed = false;

    for (const base of convertedBasenames) {
      // Replace .png, .jpg, .jpeg references for this basename with .webp
      const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`${escaped}\\.(png|jpg|jpeg)`, 'g');
      const before = content;
      content = content.replace(pattern, `${base}.webp`);
      if (content !== before) {
        const count = (before.match(pattern) || []).length;
        totalReplacements += count;
        changed = true;
      }
    }

    if (changed) {
      await writeFile(file, content, 'utf8');
      console.log(`Updated: ${file.replace(ROOT, '.')}`);
    }
  }

  console.log(`\nTotal replacements: ${totalReplacements}`);
}

async function deleteOriginals(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let deleted = 0;
  for (const e of entries) {
    const fp = join(dir, e.name);
    if (e.isDirectory()) {
      deleted += await deleteOriginals(fp);
    } else if (/\.(png|jpg|jpeg)$/i.test(e.name)) {
      const name = e.name.toLowerCase();
      const isLogo = SKIPPED.some(s => name.includes(s));
      if (!isLogo) {
        // Check webp version exists
        const webpPath = fp.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        try {
          await stat(webpPath);
          await unlink(fp);
          console.log(`Deleted: ${fp.replace(ROOT, '.')}`);
          deleted++;
        } catch {
          console.log(`Skipped (no webp found): ${e.name}`);
        }
      }
    }
  }
  return deleted;
}

async function main() {
  console.log('Step 1: Collecting converted filenames...');
  const webpBases = await getWebpFiles(ASSETS_DIR);
  console.log(`Found ${webpBases.length} converted files.\n`);

  console.log('Step 2: Updating source file references...\n');
  await updateSourceFiles(webpBases);

  console.log('\nStep 3: Deleting original image files...\n');
  const deleted = await deleteOriginals(ASSETS_DIR);
  console.log(`\n✓ Done. Deleted ${deleted} original files.`);
}

main().catch(console.error);

