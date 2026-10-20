import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontDir = path.resolve(__dirname, '..');
const productsJsonPath = path.join(frontDir, 'src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

// 1. Netflix update
const netflix = products.find(p => p.id === 'netflix-premium-4k');
if (netflix) {
  const p1 = netflix.plans.find(pl => pl.id === 'netflix-4k-1device-1m');
  if (p1) {
    p1.name = '1 Profile — 1 Month';
    p1.price = { LK: 'LKR 990/=', GLOBAL: '$3.00' };
    p1.description = '1 Profile (1 Device) 4K Ultra HD streaming with instant login credentials.';
  } else {
    netflix.plans.unshift({
      id: 'netflix-4k-1profile-1m',
      name: '1 Profile — 1 Month',
      duration: '1 Month',
      price: { LK: 'LKR 990/=', GLOBAL: '$3.00' },
      description: '1 Profile 4K Ultra HD streaming with instant login credentials.',
      activation: 'Email:Password:LoginLink',
      image: '/assets/products/netflix.png'
    });
  }
}

// 2. LinkedIn Premium update
const linkedin = products.find(p => p.id === 'linkedin-premium');
if (linkedin) {
  linkedin.name = 'LinkedIn Premium Career & Business';
  linkedin.plans = [
    {
      id: 'linkedin-own-3m',
      name: 'Own Account — 3 Months',
      duration: '3 Months',
      price: { LK: 'LKR 790/=', GLOBAL: '$2.40' },
      description: '3 Months LinkedIn Premium activated directly on your own personal LinkedIn account',
      activation: 'Own Account Activation',
      available: true,
      image: '/assets/products/linkedin-premium-career-boost.png'
    },
    {
      id: 'linkedin-own-career-1y',
      name: 'Own Account Career — 1 Year',
      duration: '1 Year',
      price: { LK: 'LKR 9,500/=', GLOBAL: '$28.79' },
      description: '1 Year LinkedIn Premium Career plan activated directly on your own personal account',
      activation: 'Own Account Activation',
      available: true,
      image: '/assets/products/linkedin-premium.png'
    },
    {
      id: 'linkedin-own-business-1y',
      name: 'Own Account Business — 1 Year',
      duration: '1 Year',
      price: { LK: 'LKR 15,500/=', GLOBAL: '$46.97' },
      description: '1 Year LinkedIn Premium Business plan activated directly on your own personal account with unlimited browsing & business insights',
      activation: 'Own Account Activation',
      available: true,
      image: '/assets/products/linkedin-premium.png'
    }
  ];
}

// 3. Canva Pro update
const canva = products.find(p => p.id === 'canva-pro');
if (canva) {
  canva.plans = [
    {
      id: 'canva-pro-own-email-1y',
      name: 'Own Email Activation — 1 Year',
      duration: '1 Year',
      price: { LK: 'LKR 300/=', GLOBAL: '$0.91' },
      description: 'Canva Pro 1 Year activated directly on your own personal email address',
      activation: 'Own Email Activation',
      available: true,
      image: '/assets/products/canva-pro.png'
    },
    {
      id: 'canva-pro-admin-panel-500m-1y',
      name: 'Admin Panel (500 Members) — 1 Year',
      duration: '1 Year',
      price: { LK: 'LKR 1,500/=', GLOBAL: '$4.55' },
      description: 'Canva Pro full Admin Panel access for 1 Year — invite and manage up to 500 team members',
      activation: 'Admin Panel Access',
      available: true,
      image: '/assets/products/canva-pro.png'
    }
  ];
}

// 4. Lovable Pro Lite update
const lovable = products.find(p => p.id === 'lovable-pro-lite');
if (lovable) {
  lovable.plans = [
    {
      id: 'lovable-12m-code',
      name: '12 Months Access',
      duration: '12 Months',
      price: { LK: 'LKR 4,900/=', GLOBAL: '$14.85' },
      description: 'Official 12-month access code for Lovable Pro Lite full-stack AI builder',
      activation: 'Coupon Code',
      available: true,
      image: '/assets/products/lovable-1-mon-code.png'
    }
  ];
}

// 5. Udemy Personal Plan update
const udemy = products.find(p => p.id === 'udemy-personal');
if (udemy) {
  udemy.plans = [
    {
      id: 'udemy-private-1m',
      name: '1 Month — Private Account',
      duration: '1 Month',
      price: { LK: 'LKR 1,500/=', GLOBAL: '$4.55' },
      description: '100% private account with personal course progress across 11,000+ top courses',
      activation: 'Private Account',
      available: true,
      image: '/assets/products/udemy-1month-private-acc.png'
    }
  ];
}

// 6. n8n Starter update
const n8n = products.find(p => p.id === 'n8n-starter');
if (n8n) {
  n8n.plans = [
    {
      id: 'n8n-12m-code',
      name: '12 Months Access',
      duration: '12 Months',
      price: { LK: 'LKR 5,900/=', GLOBAL: '$17.88' },
      description: '12 Months n8n Starter cloud workflow automation plan coupon code',
      activation: 'Coupon Code',
      available: true,
      image: '/assets/products/n8n-starter-for-12-months-coupen-code.png'
    }
  ];
}

// 7. Autodesk update
const autodesk = products.find(p => p.id === 'autodesk-all-apps');
if (autodesk) {
  autodesk.plans = [
    {
      id: 'autodesk-3y-34apps',
      name: '3 Years Access (34 Apps)',
      duration: '3 Years',
      price: { LK: 'LKR 2,900/=', GLOBAL: '$8.79' },
      description: '3-Year official private Autodesk access for 34 apps activated directly on your personal email',
      activation: 'Own Email Activation',
      available: true,
      image: '/assets/products/autodesk.png'
    },
    {
      id: 'autodesk-1y',
      name: '1 Year Access',
      duration: '1 Year',
      price: { LK: 'LKR 1,500/=', GLOBAL: '$4.55' },
      description: '1-Year official private Autodesk access for 46+ apps activated on your personal email',
      activation: 'Own Email Activation',
      available: true,
      image: '/assets/products/autodesk.png'
    }
  ];
}

// 8. CapCut Pro update
const capcut = products.find(p => p.id === 'capcut-pro');
if (capcut) {
  capcut.image = '/assets/products/capcut-pro-bigger-creativity.png';
  capcut.plans = [
    {
      id: 'capcut-private-1m',
      name: '1 Month — Private Account',
      duration: '1 Month',
      price: { LK: 'LKR 700/=', GLOBAL: '$2.12' },
      description: 'CapCut Pro 1-Month private account. Watermark-free 4K export & full VIP assets.',
      activation: 'Private Account',
      available: true,
      image: '/assets/products/capcut-pro-bigger-creativity.png'
    },
    {
      id: 'capcut-private-6m',
      name: '6 Months — Private Account',
      duration: '6 Months',
      price: { LK: 'LKR 4,000/=', GLOBAL: '$12.12' },
      description: 'CapCut Pro 6-Month private account. Full VIP effects, 4K export & AI video tools.',
      activation: 'Private Account',
      available: true,
      image: '/assets/products/capcut-pro-bigger-creativity.png'
    },
    {
      id: 'capcut-private-12m',
      name: '12 Months — Private Account',
      duration: '12 Months',
      price: { LK: 'LKR 8,000/=', GLOBAL: '$24.24' },
      description: 'CapCut Pro 12-Month (1 Year) private account with full warranty throughout active period.',
      activation: 'Private Account',
      available: true,
      image: '/assets/products/capcut-pro-bigger-creativity.png'
    }
  ];
}

// 9. Coursera Plus update
const coursera = products.find(p => p.id === 'coursera-plus');
if (coursera) {
  coursera.plans = [
    {
      id: 'coursera-readymade-1m',
      name: 'Ready-Made — 1 Month',
      duration: '1 Month',
      price: { LK: 'LKR 490/=', GLOBAL: '$1.48' },
      description: 'Pre-configured ready-to-learn account delivered instantly with 1-Month full access',
      activation: 'Ready-Made Account',
      available: true,
      image: '/assets/products/coursera-1-year.png'
    },
    {
      id: 'coursera-readymade-12m',
      name: 'Ready-Made — 12 Months',
      duration: '12 Months',
      price: { LK: 'LKR 2,500/=', GLOBAL: '$7.58' },
      description: 'Pre-configured ready-to-learn account delivered instantly with 12 Months warranty',
      activation: 'Ready-Made Account',
      available: true,
      image: '/assets/products/coursera-1-year.png'
    },
    {
      id: 'coursera-own-email-1y',
      name: 'Own Email Activation — 1 Year',
      duration: '1 Year',
      price: { LK: 'LKR 5,000/=', GLOBAL: '$15.15' },
      description: 'Activated directly on your own personal email address with full certificates in your name',
      activation: 'Own Email Activation',
      available: true,
      image: '/assets/products/coursera-1-year.png'
    }
  ];
}

// 10. Gemini AI Pro update
const googleAi = products.find(p => p.id === 'google-ai-pro');
if (googleAi) {
  googleAi.name = 'Google Gemini AI Pro';
  if (googleAi.plans && googleAi.plans.length > 0) {
    googleAi.plans[0].name = '18 Months Access';
    googleAi.plans[0].price = { LK: 'LKR 790/=', GLOBAL: '$2.40' };
  }
}

// NEW PRODUCTS:
const newProducts = [
  {
    id: 'apple-tv',
    name: 'Apple TV+',
    category: 'subscriptions',
    shortDescription: 'Apple TV+ 12-Month full streaming access on your own account. Award-winning Apple Originals in 4K HDR.',
    description: 'Stream award-winning Apple Originals, blockbuster movies, hit series, documentaries, and live sports in stunning 4K HDR with spatial audio on Apple TV+. Activated directly on your own personal Apple ID.',
    plans: [
      {
        id: 'apple-tv-own-12m',
        name: 'Own Account Activation — 12 Months',
        duration: '12 Months',
        price: { LK: 'LKR 3,900/=', GLOBAL: '$11.82' },
        description: '12-Month Apple TV+ subscription activated directly on your own personal Apple ID account.',
        activation: 'Own Account Activation',
        available: true,
        image: '/assets/products/apple-tv-streaming-experience.png'
      }
    ],
    activation: 'Own Apple ID Activation',
    features: [
      'Apple Originals, Emmy-winning series & hit movies',
      '4K HDR streaming with Dolby Vision & Dolby Atmos',
      '12-Month full subscription on your own Apple ID',
      'Watch on Apple TV app, Smart TVs, iPhone, iPad, Mac & PC',
      'Family Sharing support & offline downloads'
    ],
    image: '/assets/products/apple-tv-streaming-experience.png',
    badge: 'STREAMING',
    featured: true,
    available: true,
    order: 36
  },
  {
    id: 'adobe-express',
    name: 'Adobe Express Premium',
    category: 'subscriptions',
    shortDescription: 'Create stunning social graphics, flyers, videos & animations with Adobe Express Premium 12 Months.',
    description: 'Adobe Express Premium gives you complete creative freedom with thousands of beautiful templates, Adobe Stock photos, generative AI powered by Adobe Firefly, premium fonts, and one-click resizing for 12 full months.',
    plans: [
      {
        id: 'adobe-express-12m',
        name: '12 Months Access',
        duration: '12 Months',
        price: { LK: 'LKR 990/=', GLOBAL: '$3.00' },
        description: '12-Month Adobe Express Premium access with generative AI tools and full template library.',
        activation: 'Account Activation',
        available: true,
        image: '/assets/products/adobe-express-creative-studio-banner.png'
      }
    ],
    activation: 'Account Activation',
    features: [
      'All Adobe Express Premium tools & 200M+ Adobe Stock assets',
      'Generative AI tools powered by Adobe Firefly',
      'One-click background remover & resize to any social size',
      '20,000+ Adobe Fonts & custom brand kit management',
      '12-month full access & priority support'
    ],
    image: '/assets/products/adobe-express-creative-studio-banner.png',
    badge: 'CREATIVE',
    featured: true,
    available: true,
    order: 37
  },
  {
    id: 'prime-video',
    name: 'Amazon Prime Video',
    category: 'subscriptions',
    shortDescription: 'Stream Prime Originals, blockbuster movies & hit TV shows in 4K UHD. 1 Profile access.',
    description: 'Amazon Prime Video gives you unlimited streaming of exclusive Amazon Originals, movies, and TV shows in crystal clear 4K Ultra HD. Choose from 1 Month or 6 Months 1-Profile access.',
    plans: [
      {
        id: 'prime-video-1m-1profile',
        name: '1 Profile — 1 Month',
        duration: '1 Month',
        price: { LK: 'LKR 490/=', GLOBAL: '$1.48' },
        description: '1 Profile access for 1 Month. 4K Ultra HD streaming with personal watchlist.',
        activation: 'Login Credentials',
        available: true,
        image: '/assets/products/prime-video.jpg'
      },
      {
        id: 'prime-video-6m-1profile',
        name: '1 Profile — 6 Months Premium',
        duration: '6 Months',
        price: { LK: 'LKR 1,490/=', GLOBAL: '$4.52' },
        description: '1 Profile access for 6 Months. High stability 4K Ultra HD streaming with warranty.',
        activation: 'Login Credentials',
        available: true,
        image: '/assets/products/prime-video.jpg'
      }
    ],
    activation: 'Login Credentials',
    features: [
      'Amazon Originals, The Boys, Rings of Power, Citadel & more',
      '4K Ultra HD & HDR streaming quality',
      'Supported on Smart TVs, Mobile, Tablets, PC & TV Sticks',
      'Private individual profile with PIN protection',
      'Full warranty throughout the subscription duration'
    ],
    image: '/assets/products/prime-video.jpg',
    badge: 'PRIME',
    featured: true,
    available: true,
    order: 38
  },
  {
    id: 'hbo-max-premium',
    name: 'HBO Max Premium (Max)',
    category: 'subscriptions',
    shortDescription: 'Stream HBO, Warner Bros., DC, and Discovery in 4K HDR. 1 Profile 1 Month access.',
    description: 'Max brings together the iconic worlds of HBO, Warner Bros., the DC Universe, Cartoon Network, and HGTV. Enjoy Game of Thrones, House of the Dragon, Succession, Dune, and more in 4K Ultra HD with Dolby Atmos.',
    plans: [
      {
        id: 'hbo-max-1profile-1m',
        name: '1 Profile — 1 Month',
        duration: '1 Month',
        price: { LK: 'LKR 990/=', GLOBAL: '$3.00' },
        description: '1 Profile access for 1 Month. 4K Ultra HD streaming with private profile.',
        activation: 'Login Credentials',
        available: true,
        image: '/assets/products/hbo-max-premium.jpg'
      }
    ],
    activation: 'Login Credentials',
    features: [
      'HBO Originals: House of the Dragon, The Last of Us, Succession',
      'Warner Bros. blockbusters & entire DC Universe',
      '4K Ultra HD, HDR10 & Dolby Atmos surround sound',
      '1 Profile personal access with your own watchlist',
      'Full warranty & instant delivery via WhatsApp/Telegram'
    ],
    image: '/assets/products/hbo-max-premium.jpg',
    badge: 'HBO MAX',
    featured: true,
    available: true,
    order: 39
  },
  {
    id: 'duolingo-premium',
    name: 'Duolingo Super (Premium)',
    category: 'education',
    shortDescription: 'Learn languages faster with Unlimited Hearts, No Ads, and Mistakes Review for 12 Months.',
    description: 'Super Duolingo eliminates all ads and gives you Unlimited Hearts so you can learn at your own pace without interruption. Includes Practice Hub, Personalized Practice, and unlimited test-outs for 12 months.',
    plans: [
      {
        id: 'duolingo-premium-12m',
        name: '12 Months Access',
        duration: '12 Months',
        price: { LK: 'LKR 990/=', GLOBAL: '$3.00' },
        description: '12 Months Super Duolingo access with Unlimited Hearts and zero ads.',
        activation: 'Account / Family Invite Activation',
        available: true,
        image: '/assets/products/duolingo-premium.jpg'
      }
    ],
    activation: 'Account / Family Invite Activation',
    features: [
      'Unlimited Hearts — practice as much as you want with no limits',
      'Ad-free experience — learn without interruptions',
      'Personalized Practice Hub & Mistakes Review',
      'Unlimited test-outs to skip levels faster',
      '12-Month full access with warranty'
    ],
    image: '/assets/products/duolingo-premium.jpg',
    badge: 'LANGUAGES',
    featured: true,
    available: true,
    order: 40
  },
  {
    id: 'nord-vpn',
    name: 'NordVPN Premium',
    category: 'wallet',
    shortDescription: 'Ultra-fast VPN with Threat Protection, malware blocking & 6,000+ servers worldwide for 3 Months.',
    description: 'NordVPN is the world leading VPN service offering top-grade encryption, lightning-fast NordLynx protocol, Threat Protection Pro against malware and phishing, and high-speed streaming server access for 3 Months.',
    plans: [
      {
        id: 'nordvpn-3m',
        name: '3 Months Access',
        duration: '3 Months',
        price: { LK: 'LKR 1,390/=', GLOBAL: '$4.21' },
        description: '3-Month NordVPN Premium subscription with global high-speed servers.',
        activation: 'Account Credentials',
        available: true,
        image: '/assets/products/nord-vpn.jpg'
      }
    ],
    activation: 'Account Credentials',
    features: [
      '6,000+ ultra-fast servers in 110+ countries',
      'Threat Protection Pro: blocks ads, trackers & malware',
      'No-logs policy independently audited',
      'Bypass geo-restrictions for Netflix, BBC, Hulu & streaming',
      '3-Month full warranty & support'
    ],
    image: '/assets/products/nord-vpn.jpg',
    badge: 'SECURITY',
    featured: true,
    available: true,
    order: 41
  },
  {
    id: 'perplexity-pro',
    name: 'Perplexity Pro AI',
    category: 'ai',
    shortDescription: 'Next-gen conversational search engine with unlimited Pro Searches, Claude 3.5 Sonnet & GPT-4o.',
    description: 'Perplexity Pro combines search and conversational AI with cited sources, unlimited Pro Searches, model switching (Claude 3.5 Sonnet, GPT-4o, Sonar Large), file analysis, and image generation for 6 Months.',
    plans: [
      {
        id: 'perplexity-pro-6m-shared',
        name: '6 Months Shared Account',
        duration: '6 Months',
        price: { LK: 'LKR 2,500/=', GLOBAL: '$7.58' },
        description: '6 Months Perplexity Pro access with unlimited Pro Search and Claude 3.5 Sonnet / GPT-4o.',
        activation: 'Shared Account Login',
        available: true,
        image: '/assets/products/perplexity-pro.jpg'
      }
    ],
    activation: 'Shared Account Login',
    features: [
      'Unlimited Pro Searches with step-by-step reasoning',
      'Model switching: Claude 3.5 Sonnet, GPT-4o, Sonar 32k',
      'Upload documents, PDFs & spreadsheets for instant analysis',
      'Generate images with DALL-E 3 & Flux',
      '6 Months full subscription warranty'
    ],
    image: '/assets/products/perplexity-pro-ai-showcase.png',
    badge: 'AI RESEARCH',
    featured: true,
    available: true,
    order: 42
  },
  {
    id: 'steam-account',
    name: 'Steam Gaming Account (Random Games Included)',
    category: 'gaming',
    shortDescription: 'Genuine Steam account with random premium games included. Instant delivery with full credentials.',
    description: 'Get a genuine Steam PC gaming account loaded with random premium and popular games! Instant delivery with full account credentials and email access to jump straight into PC gaming.',
    plans: [
      {
        id: 'steam-account-random',
        name: 'Steam Account with Random Games',
        duration: 'Lifetime Access',
        price: { LK: 'LKR 990/=', GLOBAL: '$3.00' },
        description: 'Original Steam account with random games included. 100% full email & password ownership.',
        activation: 'Login:Password:Email Access',
        available: true,
        image: '/assets/products/futuristic-steam-gaming-account-poster.png'
      }
    ],
    activation: 'Login:Password:Email Access',
    features: [
      'Original Steam account with random games library',
      'Changeable password & email for 100% ownership',
      'PC gaming access on Steam client',
      'Instant delivery via WhatsApp or Telegram',
      'Full login guarantee & warranty'
    ],
    image: '/assets/products/futuristic-steam-gaming-account-poster.png',
    badge: 'PC GAMING',
    featured: true,
    available: true,
    order: 43
  },
  {
    id: 'chatgpt-k12-plus',
    name: 'ChatGPT K12 Plus+ (Study Buddy)',
    category: 'education',
    shortDescription: 'Smarter Learning. Brighter Future. Your AI Study Buddy for Homework, Math, Science & Coding.',
    description: 'ChatGPT K12 Plus+ is tailored specifically for students and learners — from homework help, step-by-step math and science concept explanations, to coding support, study planning, writing and creative thinking.',
    plans: [
      {
        id: 'chatgpt-k12-1m',
        name: '1 Month Access',
        duration: '1 Month',
        price: { LK: 'LKR 1,500/=', GLOBAL: '$4.55' },
        description: 'ChatGPT K12 Plus+ 1-Month student & learning AI access.',
        activation: 'Account Login',
        available: true,
        image: '/assets/products/chatgpt-k12-plus.png'
      }
    ],
    activation: 'Account Login',
    features: [
      'Homework Help with step-by-step explanations',
      'Math, Science, English & Coding support',
      'Study Planning & organized goals',
      'Writing, Editing & creative thinking',
      'Friendly, safe AI tutor interface'
    ],
    image: '/assets/products/chatgpt-k12-plus.png',
    badge: 'STUDENT AI',
    featured: true,
    available: true,
    order: 44
  }
];

newProducts.forEach(newP => {
  const existingIndex = products.findIndex(p => p.id === newP.id);
  if (existingIndex >= 0) {
    products[existingIndex] = newP;
    console.log('Updated:', newP.id);
  } else {
    products.push(newP);
    console.log('Added:', newP.id);
  }
});

fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2), 'utf8');
console.log('✓ Successfully updated products.json! Total products now:', products.length);
