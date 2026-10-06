# DigitalStoreLK ⚡

> **Smart Tools. Premium Access. Better You.**

DigitalStoreLK is a high-conversion, production-ready digital storefront for reselling premium digital products, AI subscriptions, developer tools, gaming keys, PlayStation wallet balances, and accredited online learning memberships.

Built with a modern static architecture paired with Cloudflare Pages serverless functions and Git-backed headless CMS capabilities.

---

## ✨ Features & Highlights

- **Dual Pricing Engine:** Seamless real-time switching between Sri Lanka (LKR) and Global (USD) pricing with localized currency formatting and persistent preferences.
- **WhatsApp Direct Ordering:** One-click instant checkout links with intelligently pre-formatted inquiries (product name, selected plan, currency, and direct customer details).
- **Interactive Product Catalog:**
  - Category filtering (AI & Productivity, Gaming, Developer Tools, Education, Subscriptions, PS Wallet)
  - Live real-time search across product names, features, and descriptions
  - Sorting by popularity, price, and newest arrivals
  - High-conversion product modal with plan comparison, key features, and activation details
- **Comprehensive Trust & FAQ System:** Clear explanations for Own Email Activation, PlayStation Wallet top-up guides, delivery timelines, and payment options (Bank Transfer & Binance Pay).
- **Admin CMS Dashboard (`/admin`):**
  - Secure JWT authentication
  - Product Catalog Editor (add, edit, toggle availability, adjust pricing)
  - Payment details and instructions manager
  - Store branding & logo customization
  - Media & image uploader
  - Commits updates directly back to GitHub repository via Cloudflare Serverless API (Zero database required!)
- **SEO & Performance Optimized:**
  - Open Graph & Twitter meta tags
  - Schema-ready semantic markup
  - Sub-second load times with vector graphics and tree-shaken bundles

---

## 🛠️ Technology Stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), Custom Design System (HSL tokens, glassmorphism, responsive micro-animations)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) with LocalStorage persistence
- **Icons:** [Lucide React](https://lucide.dev/)
- **Serverless / Edge:** [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- **Security:** [jose](https://github.com/panva/jose) (JWT signing and validation on the edge)

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js 18+ installed
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Happyaa2003/DigitalStoreLK_WEB_Static.git
cd DigitalStoreLK_WEB_Static/Front

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to browse the store.

---

## 🔐 Environment Variables & Admin Setup

To enable the admin panel's commit-to-repo feature and secure login:

1. Copy `.env.example` to `.env` inside `Front/`:
   ```bash
   cp .env.example .env
   ```
2. Configure the following variables in your Cloudflare Pages Dashboard or local environment:

| Variable | Description |
|---|---|
| `ADMIN_AUTH_SECRET` | Secret password/passphrase used to log into the `/admin` portal |
| `JWT_SECRET` | Strong random string (32+ chars) used to sign admin session tokens |
| `GITHUB_TOKEN` | GitHub Personal Access Token with `repo` scope to commit JSON changes |
| `GITHUB_OWNER` | GitHub username or organization (e.g. `Happyaa2003`) |
| `GITHUB_REPO` | GitHub repository name (e.g. `DigitalStoreLK_WEB_Static`) |
| `GITHUB_BRANCH` | Default branch for commits (e.g. `main`) |

> **Note:** The `GITHUB_TOKEN` and `ADMIN_AUTH_SECRET` are strictly processed server-side in Cloudflare Pages Functions (`functions/api/*`) and are never exposed to client browsers.

---

## ☁️ Deploying to Cloudflare Pages

### Option 1: Git Integration (Recommended)
1. Push this repository to GitHub.
2. In Cloudflare Dashboard, navigate to **Compute (Workers) > Pages > Connect to Git**.
3. Select this repository and set the following build settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `Front`
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
4. Under **Settings > Environment Variables**, add your production secrets (`ADMIN_AUTH_SECRET`, `JWT_SECRET`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`).
5. Click **Save and Deploy**.

### Option 2: Direct Wrangler CLI Deployment
```bash
cd Front
npm run build
npx wrangler pages deploy dist --project-name=digitalstorelk
```

---

## 🚀 Deploying to GitHub Pages (Automatic via GitHub Actions)

The public static storefront can be hosted directly on GitHub Pages at `https://Happyaa2003.github.io/DigitalStoreLK/`.

### 1. Enable GitHub Pages in your Repository Settings
1. Go to your repository on GitHub: **`https://github.com/Happyaa2003/DigitalStoreLK`**
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment > Source**, select **GitHub Actions** from the dropdown menu (instead of "Deploy from a branch").

### 2. Push to GitHub
Every time you push commits to the `main` branch, the GitHub Actions workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) will automatically:
- Install dependencies
- Build the Vite + React storefront with the correct base path (`/DigitalStoreLK/`)
- Generate `404.html` SPA fallback for direct route navigation
- Deploy the production bundle to GitHub Pages

Once deployed, visit your live store at:
👉 **`https://Happyaa2003.github.io/DigitalStoreLK/`**

---

## 📁 Project Structure

```
DigitalStoreLK_WEB_Static/
├── Front/
│   ├── functions/api/          # Cloudflare Pages Functions (Edge API)
│   │   ├── auth.ts             # JWT authentication handler
│   │   ├── github-commit.ts    # Secure Git commit bridge
│   │   └── upload-media.ts     # Media upload handler
│   ├── public/
│   │   ├── assets/brand/       # Logo & OG banners
│   │   └── assets/products/    # Vector & WebP product graphics
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # Admin UI & layout components
│   │   │   ├── home/           # Landing page sections (Hero, Deals, Categories, FAQ)
│   │   │   ├── layout/         # Header, Footer, WhatsApp floating button
│   │   │   └── products/       # ProductCard, ProductGrid, ProductModal
│   │   ├── config/             # storeConfig.json (store meta, payment info, FAQs)
│   │   ├── data/               # products.json, categories.json
│   │   ├── hooks/              # Custom hooks for pricing, filtering, auth
│   │   ├── pages/              # Public & Admin route views
│   │   ├── stores/             # Zustand state stores (pricing, admin)
│   │   ├── types/              # Comprehensive TypeScript interfaces
│   │   ├── utils/              # WhatsApp links, currency formatting, sanitization
│   │   ├── App.tsx             # Route declarations & admin guard
│   │   └── main.tsx            # Application entry point
│   ├── wrangler.toml           # Cloudflare Pages configuration
│   └── package.json
└── README.md
```

---

## 📄 License & Ownership

© 2026 DigitalStoreLK. All rights reserved.
