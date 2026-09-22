// DigitalStoreLK — Shared TypeScript Types

export type PricingRegion = 'LK' | 'GLOBAL';

export interface ProductPrice {
  LK?: string;
  GLOBAL?: string;
}

export interface ProductDiscount {
  enabled: boolean;
  label?: string;
  normalPrice?: ProductPrice;
}

export interface ProductPlan {
  id: string;
  name: string;
  duration?: string;
  price: ProductPrice;
  normalPrice?: ProductPrice;
  discount?: ProductDiscount;
  description?: string;
  activation?: string;
  badge?: string;
  image?: string;
  available?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  description?: string;
  plans: ProductPlan[];
  activation?: string;
  features?: string[];
  notes?: string[];
  image: string;
  badge?: string;
  featured?: boolean;
  available?: boolean;
  order?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  accentFrom: string;
  accentTo: string;
  textColor: string;
  productCount?: number;
  order?: number;
}

export interface BankTransferConfig {
  enabled: boolean;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  branch?: string;
  instructions?: string;
  icon?: string;
}

export interface BinanceConfig {
  enabled: boolean;
  walletAddress?: string;
  network?: string;
  instructions?: string;
  icon?: string;
}

export interface PayPalConfig {
  enabled: boolean;
  email?: string;
  instructions?: string;
  icon?: string;
}

export interface PaymentsConfig {
  bankTransfer: BankTransferConfig;
  binance: BinanceConfig;
  paypal?: PayPalConfig;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StoreConfig {
  shopName: string;
  tagline: string;
  logo: string;
  brandLockup?: string;
  favicon?: string;
  usdToLkr?: number;
  whatsappNumber: string;
  whatsappUrl: string;
  telegramUsername?: string;
  telegramUrl?: string;
  facebookUrl?: string;
  defaultRegion: PricingRegion;
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string | null;
  };
  payments: PaymentsConfig;
  faq: FAQItem[];
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  footer: {
    disclaimer?: string;
    copyright: string;
  };
}

export interface AdminAuth {
  isAuthenticated: boolean;
  token?: string;
}

export interface ProductFilters {
  query: string;
  category: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc';
  region: PricingRegion;
}
