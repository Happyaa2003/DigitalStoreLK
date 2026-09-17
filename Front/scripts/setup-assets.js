import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontRoot = path.resolve(__dirname, '..');
const accertsDir = path.join(frontRoot, 'Accerts');
const productsDir = path.join(frontRoot, 'Products');

const publicBrand = path.join(frontRoot, 'public/assets/brand');
const publicPayments = path.join(frontRoot, 'public/assets/payments');
const publicProducts = path.join(frontRoot, 'public/assets/products');
const publicRoot = path.join(frontRoot, 'public');

[publicBrand, publicPayments, publicProducts].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 1. Copy Accerts
if (fs.existsSync(accertsDir)) {
  const accertFiles = fs.readdirSync(accertsDir);
  accertFiles.forEach((file) => {
    const src = path.join(accertsDir, file);
    if (file.toLowerCase().includes('bank') || file.toLowerCase().includes('binance')) {
      fs.copyFileSync(src, path.join(publicPayments, file));
    }
    fs.copyFileSync(src, path.join(publicBrand, file));
  });

  // Shop Logo & Favicon
  const logoSrc = path.join(accertsDir, 'LOGO.png');
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, path.join(publicBrand, 'logo.png'));
    fs.copyFileSync(logoSrc, path.join(publicBrand, 'LOGO.png'));
    fs.copyFileSync(logoSrc, path.join(publicRoot, 'favicon.png'));
    fs.copyFileSync(logoSrc, path.join(publicRoot, 'favicon.ico'));
    console.log('✓ Copied LOGO.png as brand logo and favicon');
  }
}

// 2. Copy Products
if (fs.existsSync(productsDir)) {
  const productFiles = fs.readdirSync(productsDir);
  productFiles.forEach((file) => {
    const src = path.join(productsDir, file);
    // Copy with original filename
    fs.copyFileSync(src, path.join(publicProducts, file));

    // Also copy with normalized slug
    const ext = path.extname(file);
    const slug = file
      .replace(ext, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + ext.toLowerCase();

    fs.copyFileSync(src, path.join(publicProducts, slug));
  });
  console.log(`✓ Copied ${productFiles.length} product images from Front/Products`);
}
