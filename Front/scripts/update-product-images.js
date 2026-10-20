import fs from 'fs';
import path from 'path';

const productsPath = path.resolve('src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const imageMapping = {
  'chatgpt-plus': '/assets/products/chatgpt-plus.svg',
  'chatgpt-pro': '/assets/products/chatgpt-plus.svg',
  'windows-11-pro': '/assets/products/windows-11-pro.svg',
  'windows-10-pro': '/assets/products/windows-11-pro.svg',
  'coursera-plus': '/assets/products/coursera-plus.svg',
  'adobe-creative-cloud-all-apps': '/assets/products/adobe-creative-cloud.svg',
  'office-365-plus': '/assets/products/microsoft-365.svg',
  'office-2024-ltsc': '/assets/products/microsoft-365.svg',
  'google-ai-pro': '/assets/products/google-ai-pro.svg',
  'canva-pro': '/assets/products/canva-pro.svg',
  'claude-pro': '/assets/products/claude-pro.svg',
  'claude-max': '/assets/products/claude-pro.svg',
  'cursor': '/assets/products/cursor-pro.svg',
  'supergrok': '/assets/products/supergrok.svg',
  'xbox-game-pass-ultimate': '/assets/products/xbox-game-pass.svg',
  'gta6-ps5': '/assets/products/gta6-ps5.svg',
  'gta6-xbox': '/assets/products/gta6-xbox.svg',
  'udemy-personal': '/assets/products/udemy.svg',
  'netflix-premium-4k': '/assets/products/netflix.svg',
  'linkedin-premium': '/assets/products/linkedin-premium.svg',
  'ps-wallet-balance': '/assets/products/ps-wallet.svg',
};

// Also let's set order so the 6 products from the screenshot are first:
// 1. ChatGPT Plus
// 2. Windows 11 Pro
// 3. Coursera Plus
// 4. Adobe Creative Cloud
// 5. Microsoft 365 Family (office-365-plus)
// 6. Google AI Pro
const featuredOrder = [
  'chatgpt-plus',
  'windows-11-pro',
  'coursera-plus',
  'adobe-creative-cloud-all-apps',
  'office-365-plus',
  'google-ai-pro',
];

products.forEach((p) => {
  if (imageMapping[p.id]) {
    p.image = imageMapping[p.id];
  }
  const fIndex = featuredOrder.indexOf(p.id);
  if (fIndex > -1) {
    p.featured = true;
    p.order = fIndex + 1;
  } else {
    p.order = (p.order || 10) + 10;
  }
});

// Sort array by order
products.sort((a, b) => (a.order || 99) - (b.order || 99));

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Successfully updated products.json with fast SVG images and featured ordering!');
