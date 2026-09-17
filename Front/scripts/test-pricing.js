import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const products = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/data/products.json'), 'utf8')
);
const storeConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/config/storeConfig.json'), 'utf8')
);

const usdToLkr = storeConfig.usdToLkr || 330;

function extractNumeric(val) {
  if (!val) return null;
  const lower = val.toLowerCase();
  if (lower.includes('contact') || lower.includes('inquire') || lower.includes('unpriced')) return null;
  const digits = val.replace(/[^0-9.]/g, '');
  const num = parseFloat(digits);
  return isNaN(num) || num <= 0 ? null : num;
}

function getPrice(price, region) {
  if (!price) return 'Contact for Price';
  if (region === 'LK') {
    if (price.LK && price.LK.trim() !== '') return price.LK;
    return 'Contact for Price';
  }
  // Global
  if (price.GLOBAL && price.GLOBAL.trim() !== '') return price.GLOBAL;
  if (price.LK && price.LK.trim() !== '') {
    const num = extractNumeric(price.LK);
    if (num !== null) {
      return `$${(num / usdToLkr).toFixed(2)}`;
    }
  }
  return 'Contact for Price';
}

console.log(`FX Rate: 1 USD = ${usdToLkr} LKR`);
console.log('='.repeat(70));
for (const p of products) {
  for (const plan of p.plans) {
    const lk = getPrice(plan.price, 'LK');
    const global = getPrice(plan.price, 'GLOBAL');
    console.log(
      `${(p.name + ' (' + plan.name + ')').padEnd(42)} | LK: ${lk.padEnd(14)} | Global: ${global}`
    );
  }
}
console.log('='.repeat(70));
