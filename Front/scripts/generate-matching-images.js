import fs from 'fs';
import path from 'path';

const outputDir = path.resolve('src/../public/assets/products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. ChatGPT Plus — Deep black/emerald with glowing 3D green ChatGPT spiral badge (1:1 Ratio: 400x400)
const chatgptSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="gptBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#02140d"/>
      <stop offset="50%" stop-color="#042017"/>
      <stop offset="100%" stop-color="#010c08"/>
    </linearGradient>
    <radialGradient id="gptNeon" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10a37f" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#0d8265" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#02140d" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gptBadgeGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#19c37d"/>
      <stop offset="100%" stop-color="#0a6949"/>
    </linearGradient>
    <filter id="gptGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="16" flood-color="#10a37f" flood-opacity="0.7"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="400" fill="url(#gptBg)"/>
  <!-- Glowing Aura Rings -->
  <circle cx="200" cy="200" r="160" fill="url(#gptNeon)"/>
  <circle cx="200" cy="200" r="125" fill="none" stroke="#10a37f" stroke-width="1.5" stroke-opacity="0.3"/>
  <circle cx="200" cy="200" r="170" fill="none" stroke="#10a37f" stroke-width="1" stroke-opacity="0.15" stroke-dasharray="4 6"/>
  
  <!-- 3D Rounded Badge -->
  <g filter="url(#gptGlow)">
    <rect x="135" y="135" width="130" height="130" rx="36" fill="url(#gptBadgeGrad)" stroke="#6ee7b7" stroke-width="2" stroke-opacity="0.5"/>
    <!-- ChatGPT Spiral Emblem -->
    <g transform="translate(155, 155) scale(0.9)" fill="none" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M52.6 15.8a25 25 0 0 0-38.3 8.3 25 25 0 0 0-9.2 27.5 25 25 0 0 0 17 34.6 25 25 0 0 0 38.3-8.3 25 25 0 0 0 9.2-27.5 25 25 0 0 0-17-34.6z"/>
      <path d="M52.6 15.8L35.8 45M22.1 86.2l16.8-29.2M5.1 51.6l33.6 0M99.9 51.6l-33.6 0M21.3 24.1l16.8 29.2M83.7 79.1L66.9 49.9"/>
    </g>
  </g>
</svg>`;

// 2. Windows 11 Pro — Blue Silk Wave Wallpaper with Glowing Windows 11 Logo (1:1 Ratio: 400x400)
const win11Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="winBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#001845"/>
      <stop offset="50%" stop-color="#023e8a"/>
      <stop offset="100%" stop-color="#001233"/>
    </linearGradient>
    <radialGradient id="winBloom" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0077b6" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#0096c7" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#03045e" stop-opacity="0"/>
    </radialGradient>
    <filter id="winGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="14" flood-color="#38bdf8" flood-opacity="0.7"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="400" fill="url(#winBg)"/>
  
  <!-- Windows 11 Silk Wave Layers -->
  <path d="M0 260 Q100 200 200 240 T400 200 L400 400 L0 400 Z" fill="#0077b6" fill-opacity="0.35"/>
  <path d="M0 230 Q120 300 230 240 T400 260 L400 400 L0 400 Z" fill="#0096c7" fill-opacity="0.25"/>
  <circle cx="200" cy="180" r="140" fill="url(#winBloom)"/>

  <!-- Centered Windows Logo & Text -->
  <g filter="url(#winGlow)" transform="translate(100, 135)">
    <!-- 4 Blue Windows Tiles -->
    <g transform="translate(56, 0)">
      <rect x="0" y="0" width="40" height="40" rx="5" fill="#38bdf8"/>
      <rect x="46" y="0" width="40" height="40" rx="5" fill="#38bdf8"/>
      <rect x="0" y="46" width="40" height="40" rx="5" fill="#38bdf8"/>
      <rect x="46" y="46" width="40" height="40" rx="5" fill="#38bdf8"/>
    </g>
    <!-- Windows 11 Pro Text -->
    <g transform="translate(100, 130)">
      <text x="0" y="0" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="26" letter-spacing="-0.5">Windows 11 Pro</text>
    </g>
  </g>
</svg>`;

// 3. Coursera Plus — Vibrant Coursera Blue with White Coursera Logo & PLUS Badge (1:1 Ratio: 400x400)
const courseraSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="crsBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0056D2"/>
      <stop offset="50%" stop-color="#0046a8"/>
      <stop offset="100%" stop-color="#002b66"/>
    </linearGradient>
    <radialGradient id="crsGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a7aff" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0056D2" stop-opacity="0"/>
    </radialGradient>
    <filter id="crsShadow">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="400" fill="url(#crsBg)"/>
  <circle cx="200" cy="200" r="160" fill="url(#crsGlow)"/>

  <!-- Geometric Abstract Lines -->
  <path d="M-50 300 L450 100" stroke="#ffffff" stroke-width="1" stroke-opacity="0.1" stroke-dasharray="6 8"/>
  <path d="M-50 330 L450 130" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.08"/>

  <!-- Logo Group -->
  <g filter="url(#crsShadow)" transform="translate(100, 160)">
    <!-- Coursera Text -->
    <text x="100" y="32" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="44" letter-spacing="-1">coursera</text>
    
    <!-- PLUS Badge Pill -->
    <g transform="translate(50, 52)">
      <rect x="0" y="0" width="100" height="32" rx="8" fill="#002b66" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="50" y="23" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="18" letter-spacing="2">PLUS</text>
    </g>
  </g>
</svg>`;

// 4. Adobe Creative Cloud — 3D Colorful Infinity Ribbon Gradient (1:1 Ratio: 400x400)
const adobeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="adBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a0010"/>
      <stop offset="50%" stop-color="#0a0515"/>
      <stop offset="100%" stop-color="#030208"/>
    </linearGradient>
    <radialGradient id="adRadial" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e11d48" stop-opacity="0.7"/>
      <stop offset="50%" stop-color="#9333ea" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0a0515" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="adGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff0000"/>
      <stop offset="25%" stop-color="#ff6600"/>
      <stop offset="50%" stop-color="#ff00aa"/>
      <stop offset="75%" stop-color="#aa00ff"/>
      <stop offset="100%" stop-color="#00c8ff"/>
    </linearGradient>
    <filter id="adGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#ff00aa" flood-opacity="0.7"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="400" fill="url(#adBg)"/>
  <circle cx="200" cy="200" r="160" fill="url(#adRadial)"/>

  <!-- 3D Adobe Infinity Ribbon -->
  <g filter="url(#adGlow)" transform="translate(130, 130) scale(1.15)">
    <!-- Outer thick ribbon loop -->
    <path d="M60 15 C30 15, 10 38, 10 60 C10 82, 30 105, 60 105 C90 105, 110 82, 110 60 C110 38, 90 15, 60 15 Z" fill="none" stroke="url(#adGrad)" stroke-width="26" stroke-linecap="round"/>
    <!-- Inner cutouts for infinity loop depth -->
    <path d="M40 38 C50 28, 70 28, 80 38 C90 48, 90 72, 80 82 C70 92, 50 92, 40 82 C30 72, 30 48, 40 38 Z" fill="#ffffff" fill-opacity="0.95"/>
    <circle cx="60" cy="60" r="18" fill="#0a0515"/>
  </g>
</svg>`;

// 5. Microsoft 365 Family — Dark card with 3D colorful icons: W, X, P, O, Teams (1:1 Ratio: 400x400)
const m365Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="mBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#04122e"/>
      <stop offset="50%" stop-color="#08204d"/>
      <stop offset="100%" stop-color="#020917"/>
    </linearGradient>
    <radialGradient id="mGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#04122e" stop-opacity="0"/>
    </radialGradient>
    <filter id="tileDrop">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="400" fill="url(#mBg)"/>
  <circle cx="200" cy="200" r="160" fill="url(#mGlow)"/>

  <!-- 3D Office Suite Tiles (Row 1: W, X, P, O | Row 2: Teams, OneNote, OneDrive) -->
  <g transform="translate(90, 140)" filter="url(#tileDrop)">
    <!-- Word -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="46" height="46" rx="11" fill="#185abd" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.5"/>
      <text x="14" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">W</text>
    </g>
    <!-- Excel -->
    <g transform="translate(58, 0)">
      <rect x="0" y="0" width="46" height="46" rx="11" fill="#107c41" stroke="#4ade80" stroke-width="1.2" stroke-opacity="0.5"/>
      <text x="15" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">X</text>
    </g>
    <!-- PowerPoint -->
    <g transform="translate(116, 0)">
      <rect x="0" y="0" width="46" height="46" rx="11" fill="#c43e1c" stroke="#fb923c" stroke-width="1.2" stroke-opacity="0.5"/>
      <text x="16" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">P</text>
    </g>
    <!-- Outlook -->
    <g transform="translate(174, 0)">
      <rect x="0" y="0" width="46" height="46" rx="11" fill="#0078d4" stroke="#60a5fa" stroke-width="1.2" stroke-opacity="0.5"/>
      <text x="15" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">O</text>
    </g>

    <!-- Row 2 -->
    <!-- Teams -->
    <g transform="translate(29, 60)">
      <rect x="0" y="0" width="46" height="46" rx="11" fill="#464eb8" stroke="#a78bfa" stroke-width="1.2" stroke-opacity="0.5"/>
      <text x="15" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">T</text>
    </g>
    <!-- OneNote -->
    <g transform="translate(87, 60)">
      <rect x="0" y="0" width="46" height="46" rx="11" fill="#7719aa" stroke="#c084fc" stroke-width="1.2" stroke-opacity="0.5"/>
      <text x="15" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">N</text>
    </g>
    <!-- OneDrive -->
    <g transform="translate(145, 60)">
      <rect x="0" y="0" width="46" height="46" rx="11" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.5"/>
      <path d="M14 28 C12 24 16 19 22 19 C24 15 29 15 31 18 C35 17 38 20 37 25 C39 26 39 28 36 28 Z" fill="#ffffff"/>
    </g>
  </g>
</svg>`;

// 6. Google AI Pro — Clean dark background with vibrant 3D Google 'G' (1:1 Ratio: 400x400)
const googleAiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="ggBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#030d22"/>
      <stop offset="50%" stop-color="#081836"/>
      <stop offset="100%" stop-color="#020612"/>
    </linearGradient>
    <radialGradient id="ggGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4285F4" stop-opacity="0.7"/>
      <stop offset="50%" stop-color="#EA4335" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#030d22" stop-opacity="0"/>
    </radialGradient>
    <filter id="ggShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#4285F4" flood-opacity="0.7"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="400" fill="url(#ggBg)"/>
  <circle cx="200" cy="200" r="160" fill="url(#ggGlow)"/>

  <!-- 3D 4-Color Google 'G' Icon -->
  <g filter="url(#ggShadow)" transform="translate(130, 130) scale(2.0)">
    <path d="M48 24.5 C48 22.8 47.8 21.2 47.5 19.6 L24.5 19.6 L24.5 28.8 L37.7 28.8 C37.1 32 35.3 34.6 32.5 36.5 L40.2 42.5 C44.7 38.3 48 32.1 48 24.5 Z" fill="#4285F4"/>
    <path d="M24.5 48 C31.1 48 36.6 45.8 40.2 42.5 L32.5 36.5 C30.4 37.9 27.7 38.8 24.5 38.8 C18.1 38.8 12.7 34.5 10.7 28.7 L2.7 34.9 C6.7 42.8 15 48 24.5 48 Z" fill="#34A853"/>
    <path d="M10.7 28.7 C10.2 27.2 9.9 25.6 9.9 24 C9.9 22.4 10.2 20.8 10.7 19.3 L2.7 13.1 C1 16.5 0 20.1 0 24 C0 27.9 1 31.5 2.7 34.9 L10.7 28.7 Z" fill="#FBBC05"/>
    <path d="M24.5 9.2 C28.1 9.2 31.3 10.4 33.8 12.8 L40.4 6.2 C36.6 2.6 31.1 0 24.5 0 C15 0 6.7 5.2 2.7 13.1 L10.7 19.3 C12.7 13.5 18.1 9.2 24.5 9.2 Z" fill="#EA4335"/>
  </g>
</svg>`;

const files = {
  'chatgpt-plus.svg': chatgptSvg,
  'windows-11-pro.svg': win11Svg,
  'coursera-plus.svg': courseraSvg,
  'adobe-creative-cloud.svg': adobeSvg,
  'microsoft-365.svg': m365Svg,
  'google-ai-pro.svg': googleAiSvg,
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(outputDir, filename), content.trim());
  console.log(`Generated 1:1 high-impact ${filename}`);
}

console.log('All matching product SVGs regenerated successfully as 1:1 ratio!');
