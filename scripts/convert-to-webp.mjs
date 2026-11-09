import sharp from 'sharp';
import { readdir, stat, unlink, rename } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'public', 'assets');

// Skip logo/branding PNGs that need transparency preserved at tiny size
const SKIP_FILES = [
  'advithiya_logo',
  'brand_logo',
  'advithiya_monogram',
];

const MAX_MB = 24; // target max per file
const QUALITY = 82; // WebP quality (82 is a great balance for photographic renders)

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function shouldSkip(filePath) {
  const name = basename(filePath).toLowerCase();
  return SKIP_FILES.some(s => name.includes(s));
}

async function convertToWebP(inputPath) {
  const ext = extname(inputPath);
  const outputPath = inputPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
  const { size: inputSize } = await stat(inputPath);
  const inputMB = (inputSize / 1024 / 1024).toFixed(2);

  let quality = QUALITY;
  let result;

  // Try converting; if output > MAX_MB, reduce quality in steps
  for (let q = quality; q >= 50; q -= 10) {
    result = await sharp(inputPath)
      .webp({ quality: q, effort: 4 })
      .toBuffer();
    const outMB = result.length / 1024 / 1024;
    if (outMB <= MAX_MB) {
      quality = q;
      break;
    }
  }

  const outputMB = (result.length / 1024 / 1024).toFixed(2);
  const saving = (((inputSize - result.length) / inputSize) * 100).toFixed(1);

  await sharp(result).toFile(outputPath);

  console.log(`✓ ${basename(inputPath).padEnd(45)} ${inputMB.padStart(6)} MB → ${outputMB.padStart(6)} MB  (${saving}% smaller, q=${quality})`);

  return { inputPath, outputPath, inputMB: parseFloat(inputMB), outputMB: parseFloat(outputMB) };
}

async function main() {
  console.log(`\nScanning: ${ASSETS_DIR}\n`);
  const images = await getAllImages(ASSETS_DIR);
  const toConvert = images.filter(f => !shouldSkip(f));

  console.log(`Found ${toConvert.length} images to convert (skipping ${images.length - toConvert.length} logo files)\n`);
  console.log('File'.padEnd(45), 'Before'.padStart(9), '  After'.padStart(9), '  Saving\n' + '-'.repeat(80));

  let totalBefore = 0, totalAfter = 0;
  const results = [];

  for (const img of toConvert) {
    try {
      const r = await convertToWebP(img);
      results.push(r);
      totalBefore += r.inputMB;
      totalAfter += r.outputMB;
    } catch (err) {
      console.error(`✗ Failed: ${img} — ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Total: ${totalBefore.toFixed(1)} MB → ${totalAfter.toFixed(1)} MB  (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}% saved)`);
  console.log('\nAll WebP files created. Original files kept — delete manually or run with --delete-originals flag.\n');

  // Delete originals if flag passed
  if (process.argv.includes('--delete-originals')) {
    for (const { inputPath } of results) {
      await unlink(inputPath);
      console.log(`Deleted: ${basename(inputPath)}`);
    }
    console.log('\nOriginals deleted.');
  }
}

main().catch(console.error);

