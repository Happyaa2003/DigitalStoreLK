import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../public/assets/products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const products = [
  {
    filename: 'google-ai-pro.svg',
    title: 'Google AI Pro',
    subtitle: '18-Month Unlimited Access • Gemini Ultra',
    badge: 'ADVANCED AI',
    primaryColor: '#4285F4',
    secondaryColor: '#9B51E0',
    bgStart: '#0F172A',
    bgEnd: '#1E1B4B',
    accent: '#EA4335',
    icon: '✨',
  },
  {
    filename: 'claude-max.svg',
    title: 'Claude Max',
    subtitle: '5X & 20X Power Limits • Own Email Activation',
    badge: 'ANTHROPIC',
    primaryColor: '#D97706',
    secondaryColor: '#B45309',
    bgStart: '#18181B',
    bgEnd: '#291809',
    accent: '#F59E0B',
    icon: '⚡',
  },
  {
    filename: 'claude-pro.svg',
    title: 'Claude Pro',
    subtitle: 'Sonnet & Opus Access • Project Artifacts',
    badge: 'POPULAR CHOICE',
    primaryColor: '#F59E0B',
    secondaryColor: '#EA580C',
    bgStart: '#18181B',
    bgEnd: '#271912',
    accent: '#FB923C',
    icon: '🧠',
  },
  {
    filename: 'chatgpt-plus.svg',
    title: 'ChatGPT Plus',
    subtitle: 'GPT-4o, Canvas, Voice Mode & DALL-E',
    badge: 'OPENAI',
    primaryColor: '#10A37F',
    secondaryColor: '#059669',
    bgStart: '#091512',
    bgEnd: '#0F261E',
    accent: '#34D399',
    icon: '🤖',
  },
  {
    filename: 'chatgpt-pro.svg',
    title: 'ChatGPT Pro',
    subtitle: 'Unlimited o1 reasoning • Highest compute',
    badge: 'ULTIMATE COMPUTE',
    primaryColor: '#000000',
    secondaryColor: '#10A37F',
    bgStart: '#050505',
    bgEnd: '#141E1B',
    accent: '#6EE7B7',
    icon: '⚡',
  },
  {
    filename: 'cursor.svg',
    title: 'Cursor AI',
    subtitle: 'AI-First Code Editor • Claude 3.5 & GPT-4o',
    badge: 'DEV TOOL',
    primaryColor: '#6366F1',
    secondaryColor: '#8B5CF6',
    bgStart: '#0A0B14',
    bgEnd: '#181533',
    accent: '#A855F7',
    icon: '💻',
  },
  {
    filename: 'supergrok.svg',
    title: 'SuperGrok',
    subtitle: 'xAI Uncensored Intelligence • Real-time X data',
    badge: 'xAI POWER',
    primaryColor: '#38BDF8',
    secondaryColor: '#0284C7',
    bgStart: '#020617',
    bgEnd: '#0B1E3B',
    accent: '#38BDF8',
    icon: '🚀',
  },
  {
    filename: 'coursera-plus.svg',
    title: 'Coursera Plus',
    subtitle: '7,000+ Courses & Degrees • Own Email Activation',
    badge: 'ACCREDITED CERTIFICATES',
    primaryColor: '#0056D2',
    secondaryColor: '#00419E',
    bgStart: '#0A192F',
    bgEnd: '#0C2A52',
    accent: '#60A5FA',
    icon: '🎓',
  },
  {
    filename: 'udemy.svg',
    title: 'Udemy Personal',
    subtitle: '11,000+ Top Tech & Business Video Courses',
    badge: 'SELF-PACED LEARNING',
    primaryColor: '#A435F0',
    secondaryColor: '#8710D8',
    bgStart: '#130A24',
    bgEnd: '#291047',
    accent: '#C084FC',
    icon: '📚',
  },
  {
    filename: 'gta6-ps5.svg',
    title: 'GTA 6 — PS5',
    subtitle: 'Next-Gen Vice City • Pre-order Edition',
    badge: 'PLAYSTATION 5',
    primaryColor: '#EC4899',
    secondaryColor: '#00439C',
    bgStart: '#050B24',
    bgEnd: '#2D0A24',
    accent: '#F43F5E',
    icon: '🎮',
  },
  {
    filename: 'gta6-xbox.svg',
    title: 'GTA 6 — Xbox',
    subtitle: 'Series X|S Optimized • 4K HDR Ray Tracing',
    badge: 'XBOX SERIES X|S',
    primaryColor: '#107C10',
    secondaryColor: '#0E6A0E',
    bgStart: '#061706',
    bgEnd: '#132A13',
    accent: '#22C55E',
    icon: '🎮',
  },
  {
    filename: 'ps-wallet.svg',
    title: 'PS Wallet Top-Up',
    subtitle: 'Redeem Keys • Up to 40% OFF Store Prices',
    badge: 'INSTANT KEYS',
    primaryColor: '#003791',
    secondaryColor: '#0070D1',
    bgStart: '#031026',
    bgEnd: '#09234A',
    accent: '#38BDF8',
    icon: '💳',
  },
  {
    filename: 'linkedin-premium.svg',
    title: 'LinkedIn Premium',
    subtitle: 'Career & Business • Own Account Activation',
    badge: 'CAREER BOOST',
    primaryColor: '#0A66C2',
    secondaryColor: '#004182',
    bgStart: '#041427',
    bgEnd: '#0A2540',
    accent: '#38BDF8',
    icon: '💼',
  },
];

for (const p of products) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bgStart}" />
      <stop offset="100%" stop-color="${p.bgEnd}" />
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.primaryColor}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${p.secondaryColor}" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.primaryColor}" />
      <stop offset="100%" stop-color="${p.secondaryColor}" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="450" fill="url(#bgGrad)" />

  <!-- Ambient Glow Orbs -->
  <circle cx="700" cy="80" r="240" fill="url(#glowGrad)" filter="blur(40px)" />
  <circle cx="100" cy="380" r="180" fill="url(#glowGrad)" filter="blur(50px)" />

  <!-- Grid overlay -->
  <g opacity="0.06" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="75" x2="800" y2="75" />
    <line x1="0" y1="150" x2="800" y2="150" />
    <line x1="0" y1="225" x2="800" y2="225" />
    <line x1="0" y1="300" x2="800" y2="300" />
    <line x1="0" y1="375" x2="800" y2="375" />
    <line x1="160" y1="0" x2="160" y2="450" />
    <line x1="320" y1="0" x2="320" y2="450" />
    <line x1="480" y1="0" x2="480" y2="450" />
    <line x1="640" y1="0" x2="640" y2="450" />
  </g>

  <!-- Central Card Display -->
  <g transform="translate(60, 50)">
    <!-- Badge -->
    <rect x="0" y="0" width="180" height="32" rx="16" fill="${p.primaryColor}" fill-opacity="0.2" stroke="${p.accent}" stroke-opacity="0.4" stroke-width="1.5" />
    <text x="90" y="20" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="800" fill="${p.accent}" text-anchor="middle" letter-spacing="1.5">
      ${p.badge}
    </text>

    <!-- Icon Floating -->
    <g transform="translate(540, 40)">
      <circle cx="50" cy="50" r="54" fill="${p.primaryColor}" fill-opacity="0.15" stroke="${p.accent}" stroke-opacity="0.3" stroke-width="2" />
      <text x="50" y="66" font-size="52" text-anchor="middle">${p.icon}</text>
    </g>

    <!-- Title -->
    <text x="0" y="125" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="-1">
      ${p.title}
    </text>

    <!-- Subtitle -->
    <text x="0" y="175" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="500" fill="#94A3B8">
      ${p.subtitle}
    </text>

    <!-- Visual divider bar -->
    <rect x="0" y="220" width="120" height="4" rx="2" fill="url(#btnGrad)" />

    <!-- Feature tags -->
    <g transform="translate(0, 255)">
      <rect x="0" y="0" width="140" height="36" rx="8" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
      <text x="70" y="23" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">
        ✓ Verified Store
      </text>

      <rect x="155" y="0" width="140" height="36" rx="8" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
      <text x="225" y="23" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">
        ⚡ Fast Delivery
      </text>

      <rect x="310" y="0" width="160" height="36" rx="8" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
      <text x="390" y="23" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">
        🔒 100% Genuine
      </text>
    </g>
  </g>
</svg>`;

  fs.writeFileSync(path.join(outputDir, p.filename), svgContent.trim());
}

console.log(`Successfully generated ${products.length} product SVGs in ${outputDir}`);
