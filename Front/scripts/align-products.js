import fs from 'fs';
import path from 'path';

const productsPath = path.resolve('src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// 1. ChatGPT Plus
const gpt = products.find((p) => p.id === 'chatgpt-plus');
if (gpt) {
  gpt.badge = 'Most Popular';
  // Insert 1 Month plan at front if not already present
  if (!gpt.plans.some((pl) => pl.name === '1 Month')) {
    gpt.plans.unshift({
      id: 'chatgpt-plus-1m',
      name: '1 Month',
      duration: '1 Month',
      price: {
        LK: 'LKR 3,200/=',
        GLOBAL: '$9.70',
      },
      description: '1-Month ChatGPT Plus subscription with Private Account access',
      activation: 'Private Account',
    });
  }
}

// 2. Windows 11 Pro
const win11 = products.find((p) => p.id === 'windows-11-pro');
if (win11) {
  win11.badge = 'Best Value';
  win11.plans[0] = {
    id: 'win-11-pro-license',
    name: '1 License',
    duration: 'Lifetime Use',
    price: {
      LK: 'LKR 500/=',
      GLOBAL: '$1.50',
    },
    description: '100% Genuine Microsoft Retail Activation Key for 1 PC',
    activation: 'Original License',
  };
}

// 3. Coursera Plus
const coursera = products.find((p) => p.id === 'coursera-plus');
if (coursera) {
  coursera.badge = 'Popular';
  if (!coursera.plans.some((pl) => pl.duration === '12 Months')) {
    coursera.plans.unshift({
      id: 'coursera-plus-12m',
      name: '12 Months',
      duration: '12 Months',
      price: {
        LK: 'LKR 1,200/=',
        GLOBAL: '$3.60',
      },
      description: 'Coursera Plus 12-Month access with unlimited certificate courses',
      activation: 'Account Activation',
    });
  }
}

// 4. Adobe Creative Cloud
const adobe = products.find((p) => p.id === 'adobe-creative-cloud-all-apps');
if (adobe) {
  adobe.name = 'Adobe Creative Cloud';
  adobe.badge = 'Popular';
  if (!adobe.plans.some((pl) => pl.duration === '1 Month')) {
    adobe.plans.unshift({
      id: 'adobe-cc-1m',
      name: '1 Month',
      duration: '1 Month',
      price: {
        LK: 'LKR 2,500/=',
        GLOBAL: '$7.50',
      },
      description: 'Full Adobe Creative Cloud All Apps access for 1 Month',
      activation: 'All Apps Access',
    });
  }
}

// 5. Microsoft 365 Family
const m365 = products.find((p) => p.id === 'office-365-plus');
if (m365) {
  m365.name = 'Microsoft 365 Family';
  m365.badge = 'New';
  if (!m365.plans.some((pl) => pl.duration === '1 Year')) {
    m365.plans.unshift({
      id: 'm365-family-1y',
      name: '1 Year',
      duration: '1 Year',
      price: {
        LK: 'LKR 6,500/=',
        GLOBAL: '$19.70',
      },
      description: 'Microsoft 365 Family plan for 5 Devices on 1 Account',
      activation: '5 Devices • 1 Account',
    });
  }
}

// 6. Google AI Pro
const googleAi = products.find((p) => p.id === 'google-ai-pro');
if (googleAi) {
  googleAi.badge = 'New';
  googleAi.plans[0] = {
    id: 'google-ai-pro-18m',
    name: '18 Months',
    duration: '18 Months',
    price: {
      LK: 'LKR 790/=',
      GLOBAL: '$2.40',
    },
    description: '18 Months access with Gemini, 2TB Storage, and Veo 3.1 access',
    activation: 'STB Storage + Gemini',
  };
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Successfully aligned products with screenshot details and plans!');
