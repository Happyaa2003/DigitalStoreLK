import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontDir = path.resolve(__dirname, '..');
const productsSrcDir = path.join(frontDir, 'Products');
const publicProductsDir = path.join(frontDir, 'public/assets/products');
const productsJsonPath = path.join(frontDir, 'src/data/products.json');

if (!fs.existsSync(publicProductsDir)) {
  fs.mkdirSync(publicProductsDir, { recursive: true });
}

// 1. Copy all images from Front/Products to public/assets/products
const files = fs.readdirSync(productsSrcDir);
files.forEach((file) => {
  const fullSrc = path.join(productsSrcDir, file);
  if (fs.statSync(fullSrc).isDirectory()) return;

  const destOriginal = path.join(publicProductsDir, file);
  fs.copyFileSync(fullSrc, destOriginal);

  // Normalized clean slug
  const ext = path.extname(file);
  const slug = file
    .replace(ext, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + ext.toLowerCase();

  const destSlug = path.join(publicProductsDir, slug);
  fs.copyFileSync(fullSrc, destSlug);

  // Special alias for netfix.png -> netflix.png
  if (file.toLowerCase().includes('netfix')) {
    fs.copyFileSync(fullSrc, path.join(publicProductsDir, 'netflix.png'));
  }
});
console.log('✓ Copied all real images from Front/Products into public/assets/products');

// 2. Map every product to its authentic PNG from Front/Products
const realImagesMap = {
  'chatgpt-plus': '/assets/products/chat-gpt-plus.png',
  'windows-11-pro': '/assets/products/win-11-pro.png',
  'coursera-plus': '/assets/products/coursera-1-year.png',
  'adobe-creative-cloud-all-apps': '/assets/products/adobe-creative-cloud.png',
  'office-365-plus': '/assets/products/office-365-1-year.png',
  'google-ai-pro': '/assets/products/google-ai-pro-18-months.png',
  'claude-max': '/assets/products/claude-max-5x-1-month.png',
  'claude-pro': '/assets/products/claude-pro-1-year.png',
  'chatgpt-pro': '/assets/products/chatgpt-pro-5x.png',
  'cursor': '/assets/products/cursor-pro-1-month.png',
  'supergrok': '/assets/products/supergrok.png',
  'udemy-personal': '/assets/products/udemy-1month-private-acc.png',
  'lovable-pro-lite': '/assets/products/lovable-1-mon-code.png',
  'n8n-starter': '/assets/products/n8n-starter-for-12-months-coupen-code.png',
  'xbox-game-pass-ultimate': '/assets/products/xbxo-game-pass-unlimited-1-mon-all-support.png',
  'gta6-ps5': '/assets/products/gta6-ps5.png',
  'gta6-xbox': '/assets/products/gta6-xbox.png',
  'windows-10-pro': '/assets/products/win10pro.png',
  'office-2024-ltsc': '/assets/products/office_2024.png',
  'ps-wallet-balance': '/assets/products/ps-wallet.png',
  'canva-pro': '/assets/products/canva-pro.png',
  'windows-server-2025-datacenter': '/assets/products/windows-server-2025.png',
  'linkedin-premium': '/assets/products/linkedin-premium-career-boost.png',
  'netflix-premium-4k': '/assets/products/netflix.png',
  'capcut-pro': '/assets/products/capcut.png',
  'autodesk-all-apps': '/assets/products/autodesk.png',
};

// Plan-specific image maps
const planImagesMap = {
  // Claude Max
  'claude-max-5x-1m': '/assets/products/claude-max-5x-1-month.png',
  'claude-max-20x-1m': '/assets/products/claude-max-20x-1-month.png',
  'claude-max-5x-1y': '/assets/products/claude-max-5x-1-year.png',
  'claude-max-20x-1y': '/assets/products/claude-max-20x-1-year.png',
  // ChatGPT Pro
  'chatgpt-pro-5x-1m': '/assets/products/chatgpt-pro-5x.png',
  'chatgpt-pro-20x-1m': '/assets/products/chatgpt-pro-20x.png',
  // Cursor
  'cursor-pro-1m': '/assets/products/cursor-pro-1-month.png',
  'cursor-pro-plus-1m': '/assets/products/cursor-pro-1-month.png',
  'cursor-ultra-1m': '/assets/products/cursor-pro-1-month.png',
  'cursor-pro-1y': '/assets/products/cursor-pro-1-year.png',
  // Xbox
  'xbx-1m': '/assets/products/xbxo-game-pass-unlimited-1-mon-all-support.png',
  'xbx-2m': '/assets/products/xbxo-game-pass-unlimited-2-mon-all-support.png',
  'xbx-4m-std': '/assets/products/xbxo-game-pass-unlimited-4-mon-all-support.png',
  'xbx-6m': '/assets/products/xbxo-game-pass-unlimited-6-mon-all-support.png',
  'xbx-4m-tier2': '/assets/products/xbxo-game-pass-unlimited-4-mon-all-support.png',
  'xbx-8m': '/assets/products/xbxo-game-pass-unlimited-8-mon-all-support.png',
  'xbx-1y-pc': '/assets/products/xbxo-game-pass-unlimited1-year-shared-pc-only.png',
};

const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

products.forEach((p) => {
  if (realImagesMap[p.id]) {
    p.image = realImagesMap[p.id];
  }
  if (p.plans && Array.isArray(p.plans)) {
    p.plans.forEach((plan) => {
      if (planImagesMap[plan.id]) {
        plan.image = planImagesMap[plan.id];
      } else if (!plan.image || plan.image.endsWith('.svg')) {
        plan.image = p.image;
      }
    });
  }
});

fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`✓ Successfully updated products.json with real PNG product images from Front/Products`);
