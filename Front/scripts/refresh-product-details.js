import fs from 'fs';

const products = JSON.parse(fs.readFileSync('./Front/src/data/products.json', 'utf8'));
const categories = JSON.parse(fs.readFileSync('./Front/src/data/categories.json', 'utf8'));
const storeConfig = JSON.parse(fs.readFileSync('./Front/src/config/storeConfig.json', 'utf8'));

const catMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

let output = '';

output += '='.repeat(80) + '\n';
output += `   ${storeConfig.shopName.toUpperCase()} - COMPLETE PRODUCT & PRICING CATALOG\n`;
output += `   Tagline: ${storeConfig.tagline}\n`;
output += `   Generated: ${new Date().toISOString().split('T')[0]}\n`;
output += `   WhatsApp: ${storeConfig.whatsappNumber} (${storeConfig.whatsappUrl})\n`;
output += `   Telegram: @${storeConfig.telegramUsername} (${storeConfig.telegramUrl})\n`;
output += `   Facebook: ${storeConfig.facebookUrl}\n`;
output += `   Currency Rates: 1 USD ≈ LKR ${storeConfig.usdToLkr} (Reference Rate)\n`;
output += '='.repeat(80) + '\n\n';

output += '--------------------------------------------------------------------------------\n';
output += 'TABLE OF CONTENTS & QUICK PRICE INDEX\n';
output += '--------------------------------------------------------------------------------\n';
output += String('No.').padEnd(5) + String('Product Name').padEnd(32) + String('Category').padEnd(20) + String('Starting Price (LK / GLOBAL)').padEnd(25) + '\n';
output += '-'.repeat(80) + '\n';

products.forEach((p, idx) => {
  const catName = catMap[p.category] || p.category;
  let priceStr = 'Contact for Price';
  if (p.plans && p.plans.length > 0) {
    const firstPlan = p.plans[0];
    const lk = firstPlan.price?.LK || 'N/A';
    const gl = firstPlan.price?.GLOBAL || 'N/A';
    priceStr = `${lk} | ${gl}`;
  }
  output += String(idx + 1 + '.').padEnd(5) + String(p.name).substring(0, 30).padEnd(32) + String(catName).substring(0, 18).padEnd(20) + priceStr + '\n';
});

output += '\n\n';
output += '='.repeat(80) + '\n';
output += 'PAYMENT METHODS ACCEPTED\n';
output += '='.repeat(80) + '\n';
output += `1. Bank Transfer:\n`;
output += `   Bank: ${storeConfig.payments.bankTransfer.bankName}\n`;
output += `   Account Name: ${storeConfig.payments.bankTransfer.accountName}\n`;
output += `   Account Number: ${storeConfig.payments.bankTransfer.accountNumber}\n`;
output += `   Branch: ${storeConfig.payments.bankTransfer.branch}\n`;
output += `   Instructions: ${storeConfig.payments.bankTransfer.instructions}\n\n`;

output += `2. Binance / Crypto:\n`;
output += `   Network: ${storeConfig.payments.binance.network}\n`;
output += `   Wallet / Pay ID: ${storeConfig.payments.binance.walletAddress}\n`;
output += `   Instructions: ${storeConfig.payments.binance.instructions}\n\n`;

output += `3. PayPal:\n`;
output += `   Email: ${storeConfig.payments.paypal.email}\n`;
output += `   Instructions: ${storeConfig.payments.paypal.instructions}\n\n`;

output += '='.repeat(80) + '\n';
output += 'DETAILED PRODUCT INFORMATION (ALL 26 PRODUCTS)\n';
output += '='.repeat(80) + '\n\n';

products.forEach((p, index) => {
  output += '################################################################################\n';
  output += `PRODUCT #${index + 1}: ${p.name.toUpperCase()}\n`;
  output += '################################################################################\n';
  output += `Product ID:           ${p.id}\n`;
  output += `Category:             ${catMap[p.category] || p.category} (${p.category})\n`;
  if (p.badge) {
    output += `Badge / Tag:          ${p.badge}\n`;
  }
  output += `Status:               ${p.available !== false ? 'AVAILABLE IN STOCK' : 'OUT OF STOCK'}\n`;
  output += `Featured:             ${p.featured ? 'Yes (Homepage Featured)' : 'No'}\n`;
  output += `Display Order:        ${p.order ?? 'N/A'}\n`;
  output += `Image Asset:          ${p.image || 'N/A'}\n`;
  output += `Activation Type:      ${p.activation || 'Standard'}\n`;
  output += `\nShort Description:\n  ${p.shortDescription}\n`;
  
  if (p.description && p.description !== p.shortDescription) {
    output += `\nFull Description:\n  ${p.description}\n`;
  }

  // Plans & Pricing
  output += `\nAVAILABLE PLANS & PRICING:\n`;
  if (p.plans && p.plans.length > 0) {
    p.plans.forEach((plan, pIdx) => {
      output += `  ----------------------------------------------------------------------------\n`;
      output += `  Plan ${pIdx + 1}: ${plan.name} (Plan ID: ${plan.id})\n`;
      if (plan.duration) output += `  Duration:             ${plan.duration}\n`;
      output += `  Sri Lanka Price:      ${plan.price?.LK || 'Contact for Price'}\n`;
      output += `  Global Price:         ${plan.price?.GLOBAL || 'Contact for Price'}\n`;
      
      if (plan.normalPrice?.LK || plan.normalPrice?.GLOBAL) {
        output += `  Original/Normal Price: LK ${plan.normalPrice.LK || 'N/A'} | GLOBAL ${plan.normalPrice.GLOBAL || 'N/A'}\n`;
      }
      if (plan.discount) {
        if (plan.discount.label) output += `  Discount Offer:       ${plan.discount.label}\n`;
        if (plan.discount.normalPrice) {
          output += `  Normal Price (Disc.): LK ${plan.discount.normalPrice.LK || 'N/A'} | GLOBAL ${plan.discount.normalPrice.GLOBAL || 'N/A'}\n`;
        }
      }
      if (plan.activation) output += `  Plan Activation:      ${plan.activation}\n`;
      if (plan.available !== undefined) output += `  Plan Availability:    ${plan.available ? 'Available' : 'Unavailable'}\n`;
      if (plan.description) output += `  Plan Description:     ${plan.description}\n`;
      if (plan.image) output += `  Plan Specific Image:  ${plan.image}\n`;
    });
    output += `  ----------------------------------------------------------------------------\n`;
  } else {
    output += `  No specific plans listed. Please contact store on WhatsApp for pricing.\n`;
  }

  // Features
  if (p.features && p.features.length > 0) {
    output += `\nKey Features & Inclusions:\n`;
    p.features.forEach(feat => {
      output += `  • ${feat}\n`;
    });
  }

  // Notes & Instructions
  if (p.notes && p.notes.length > 0) {
    output += `\nImportant Notes, Instructions & Warranty Policies:\n`;
    p.notes.forEach(note => {
      output += `  * ${note}\n`;
    });
  }

  output += '\n\n';
});

output += '='.repeat(80) + '\n';
output += 'END OF PRODUCT DETAILS FILE\n';
output += 'For orders, bulk pricing, or inquiries: WhatsApp +94 72 151 0654\n';
output += '='.repeat(80) + '\n';

fs.writeFileSync('productDetails.txt', output, 'utf8');
fs.writeFileSync('Front/productDetails.txt', output, 'utf8');
console.log('✓ Successfully refreshed productDetails.txt with authentic Front/Products images');
