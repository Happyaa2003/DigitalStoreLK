import fs from 'fs';
import path from 'path';

const outputDir = path.resolve('Front/public/assets/products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. ChatGPT Plus SVG (Glowing emerald/cyan aura with 3D spiral logo)
const chatgptSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="gptGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10a37f" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#054e3b" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#021c15" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gptBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#03261d"/>
      <stop offset="50%" stop-color="#01140e"/>
      <stop offset="100%" stop-color="#000906"/>
    </linearGradient>
    <linearGradient id="gptBadge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#19c37d"/>
      <stop offset="100%" stop-color="#0e835b"/>
    </linearGradient>
    <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="14" flood-color="#10a37f" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="400" height="300" rx="16" fill="url(#gptBg)"/>
  <circle cx="200" cy="150" r="130" fill="url(#gptGlow)"/>
  <!-- Rounded tile -->
  <g filter="url(#shadowGlow)">
    <rect x="125" y="75" width="150" height="150" rx="36" fill="url(#gptBadge)" stroke="#38ef7d" stroke-width="2.5" stroke-opacity="0.4"/>
    <!-- ChatGPT Spiral Icon -->
    <g transform="translate(150, 100) scale(0.95)" fill="none" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M52.6 15.8a25 25 0 0 0-38.3 8.3 25 25 0 0 0-9.2 27.5 25 25 0 0 0 17 34.6 25 25 0 0 0 38.3-8.3 25 25 0 0 0 9.2-27.5 25 25 0 0 0-17-34.6z"/>
      <path d="M52.6 15.8L35.8 45M22.1 86.2l16.8-29.2M5.1 51.6l33.6 0M99.9 51.6l-33.6 0M21.3 24.1l16.8 29.2M83.7 79.1L66.9 49.9"/>
    </g>
  </g>
</svg>`;

// 2. Windows 11 Pro (3D Isometric Royal Blue Box)
const win11Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="winGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0078d4" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#021330" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="winBoxFront" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0067b8"/>
      <stop offset="50%" stop-color="#004e8c"/>
      <stop offset="100%" stop-color="#002b54"/>
    </linearGradient>
    <linearGradient id="winBoxSide" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#003e73"/>
      <stop offset="100%" stop-color="#001f3f"/>
    </linearGradient>
    <linearGradient id="winBoxTop" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#2886d8"/>
      <stop offset="100%" stop-color="#4ba0e8"/>
    </linearGradient>
    <filter id="winShadow">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0078d4" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="400" height="300" rx="16" fill="#040e21"/>
  <circle cx="200" cy="150" r="140" fill="url(#winGlow)"/>
  
  <g filter="url(#winShadow)" transform="translate(130, 50)">
    <!-- 3D Box Front Face -->
    <path d="M40 35 L140 20 L140 180 L40 195 Z" fill="url(#winBoxFront)" stroke="#38bdf8" stroke-width="1.2"/>
    <!-- 3D Box Side Face -->
    <path d="M10 50 L40 35 L40 195 L10 205 Z" fill="url(#winBoxSide)" stroke="#1e40af" stroke-width="1"/>
    <!-- 3D Box Top Face -->
    <path d="M10 50 L110 35 L140 20 L40 35 Z" fill="url(#winBoxTop)"/>
    
    <!-- Windows Logo on Front -->
    <g transform="translate(68, 65) skewY(-8) scale(0.65)" fill="#ffffff">
      <rect x="0" y="0" width="28" height="28" rx="2" fill="#00a4ef"/>
      <rect x="33" y="0" width="28" height="28" rx="2" fill="#00a4ef"/>
      <rect x="0" y="33" width="28" height="28" rx="2" fill="#00a4ef"/>
      <rect x="33" y="33" width="28" height="28" rx="2" fill="#00a4ef"/>
    </g>
    
    <!-- Text on Front -->
    <g transform="translate(58, 140) skewY(-8)">
      <text x="0" y="0" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="13" letter-spacing="0.5">Windows 11</text>
      <rect x="0" y="6" width="38" height="14" rx="3" fill="#ffffff" fill-opacity="0.2"/>
      <text x="7" y="17" fill="#67e8f9" font-family="system-ui, sans-serif" font-weight="800" font-size="10">PRO</text>
    </g>
  </g>
</svg>`;

// 3. Coursera Plus SVG (Crisp Blue / White Card)
const courseraSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="crsGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0056D2" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#021430" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="crsCardBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a2a5e"/>
      <stop offset="50%" stop-color="#00183d"/>
      <stop offset="100%" stop-color="#000e24"/>
    </linearGradient>
    <filter id="crsShadow">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#0056D2" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="400" height="300" rx="16" fill="#030d1d"/>
  <circle cx="200" cy="150" r="140" fill="url(#crsGlow)"/>
  
  <g filter="url(#crsShadow)">
    <rect x="70" y="75" width="260" height="150" rx="24" fill="url(#crsCardBg)" stroke="#2563eb" stroke-width="2" stroke-opacity="0.4"/>
    <!-- Coursera geometric badge -->
    <g transform="translate(110, 115)">
      <text x="0" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="34" letter-spacing="-0.5">coursera</text>
      <!-- PLUS Pill -->
      <g transform="translate(48, 46)">
        <rect x="0" y="0" width="84" height="26" rx="6" fill="#0056D2"/>
        <text x="14" y="19" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="1">PLUS</text>
      </g>
    </g>
  </g>
</svg>`;

// 4. Adobe Creative Cloud SVG (3D Infinity Ribbon Gradient)
const adobeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="adGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e01e5a" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#8020aa" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#020814" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="adRibbon" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff0000"/>
      <stop offset="25%" stop-color="#ff7700"/>
      <stop offset="50%" stop-color="#ff0088"/>
      <stop offset="75%" stop-color="#8800ff"/>
      <stop offset="100%" stop-color="#00aaff"/>
    </linearGradient>
    <filter id="adShadow">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#ff0088" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="400" height="300" rx="16" fill="#050813"/>
  <circle cx="200" cy="150" r="140" fill="url(#adGlow)"/>
  
  <g filter="url(#adShadow)" transform="translate(130, 80)">
    <!-- 3D Infinite Adobe CC Ribbon -->
    <path d="M70 20 C40 20, 20 45, 20 70 C20 95, 45 120, 70 120 C95 120, 120 95, 120 70 C120 45, 100 20, 70 20 Z" fill="none" stroke="url(#adRibbon)" stroke-width="28" stroke-linecap="round"/>
    <path d="M45 45 C55 35, 85 35, 95 45 C105 55, 105 85, 95 95 C85 105, 55 105, 45 95 C35 85, 35 55, 45 45 Z" fill="#ffffff" fill-opacity="0.95"/>
    <circle cx="70" cy="70" r="22" fill="#050813"/>
  </g>
</svg>`;

// 5. Microsoft 365 Family SVG (3D App Icons Suite)
const m365Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="mGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0078d4" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#030b1b" stop-opacity="0"/>
    </radialGradient>
    <filter id="mDrop">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="400" height="300" rx="16" fill="#030b1b"/>
  <circle cx="200" cy="150" r="140" fill="url(#mGlow)"/>
  
  <g transform="translate(85, 95)" filter="url(#mDrop)">
    <!-- Word Icon -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="46" height="46" rx="10" fill="#185abd"/>
      <text x="13" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">W</text>
    </g>
    <!-- Excel Icon -->
    <g transform="translate(60, 0)">
      <rect x="0" y="0" width="46" height="46" rx="10" fill="#107c41"/>
      <text x="14" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">X</text>
    </g>
    <!-- PowerPoint Icon -->
    <g transform="translate(120, 0)">
      <rect x="0" y="0" width="46" height="46" rx="10" fill="#c43e1c"/>
      <text x="15" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">P</text>
    </g>
    <!-- Outlook Icon -->
    <g transform="translate(180, 0)">
      <rect x="0" y="0" width="46" height="46" rx="10" fill="#0078d4"/>
      <text x="14" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">O</text>
    </g>
    <!-- Teams Icon -->
    <g transform="translate(30, 60)">
      <rect x="0" y="0" width="46" height="46" rx="10" fill="#464eb8"/>
      <text x="15" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">T</text>
    </g>
    <!-- OneNote Icon -->
    <g transform="translate(90, 60)">
      <rect x="0" y="0" width="46" height="46" rx="10" fill="#7719aa"/>
      <text x="14" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">N</text>
    </g>
    <!-- OneDrive Icon -->
    <g transform="translate(150, 60)">
      <rect x="0" y="0" width="46" height="46" rx="10" fill="#0078d4"/>
      <path d="M12 28 C10 24 14 18 20 18 C22 14 28 14 30 17 C34 16 38 19 36 24 C38 25 38 28 35 28 Z" fill="#ffffff"/>
    </g>
  </g>
</svg>`;

// 6. Google AI Pro SVG (Vibrant Google 'G' 3D Badge)
const googleAiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="ggGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4285F4" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#EA4335" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#020914" stop-opacity="0"/>
    </radialGradient>
    <filter id="ggShadow">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#4285F4" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="400" height="300" rx="16" fill="#040b17"/>
  <circle cx="200" cy="150" r="140" fill="url(#ggGlow)"/>
  
  <g filter="url(#ggShadow)" transform="translate(135, 80) scale(1.35)">
    <!-- Google 4-Color 'G' Logo -->
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
  console.log(`Generated ${filename}`);
}

console.log('All primary product SVGs created successfully!');
