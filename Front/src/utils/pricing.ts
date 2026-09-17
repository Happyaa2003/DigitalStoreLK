import type { PricingRegion, ProductPrice } from '@/types';
import storeConfigData from '@/config/storeConfig.json';

export const DEFAULT_USD_TO_LKR = (storeConfigData as { usdToLkr?: number }).usdToLkr ?? 330;

/**
 * Extract numeric value from a price string (e.g. "LKR 16,500/=" -> 16500, "~LKR 495/=" -> 495, "$50.00" -> 50)
 */
export function extractNumericValue(priceStr: string | undefined): number | null {
  if (!priceStr || priceStr.trim() === '') return null;
  const lower = priceStr.toLowerCase();
  if (
    lower.includes('contact') ||
    lower.includes('inquire') ||
    lower.includes('unpriced') ||
    lower.includes('varies')
  ) {
    return null;
  }
  const digits = priceStr.replace(/[^0-9.]/g, '');
  const num = parseFloat(digits);
  return isNaN(num) || num <= 0 ? null : num;
}

/**
 * Automatically compute Global USD from LKR string using fxRate (default 330)
 */
export function calculateGlobalFromLkr(lkrPrice: string, fxRate = DEFAULT_USD_TO_LKR): string | null {
  const numLkr = extractNumericValue(lkrPrice);
  if (numLkr === null) return null;
  const usd = numLkr / fxRate;
  return `$${usd.toFixed(2)}`;
}

/**
 * Automatically compute Sri Lanka LKR from USD string using fxRate (default 330)
 */
export function calculateLkrFromGlobal(usdPrice: string, fxRate = DEFAULT_USD_TO_LKR): string | null {
  const numUsd = extractNumericValue(usdPrice);
  if (numUsd === null) return null;
  const lkr = Math.round(numUsd * fxRate);
  return `LKR ${lkr.toLocaleString()}/=`;
}

/**
 * Check if a plan is unpriced (requires customer contact)
 */
export function isUnpriced(price: ProductPrice | undefined): boolean {
  if (!price) return true;
  const lk = (price.LK ?? '').trim().toLowerCase();
  const global = (price.GLOBAL ?? '').trim().toLowerCase();
  if (!lk && !global) return true;
  if (
    (lk === '' || lk.includes('contact') || lk.includes('inquire') || lk.includes('unpriced')) &&
    (global === '' || global.includes('contact') || global.includes('inquire') || global.includes('unpriced'))
  ) {
    return true;
  }
  return false;
}

/**
 * Get the display price string for a given region.
 * Automatically computes Global USD if not manually overridden,
 * or handles unpriced items gracefully with "Contact for Price".
 */
export function getPrice(
  price: ProductPrice | undefined,
  region: PricingRegion,
  fxRate = DEFAULT_USD_TO_LKR
): string {
  if (!price || isUnpriced(price)) return 'Contact for Price';

  if (region === 'LK') {
    // 1. Manual LK override
    if (price.LK && price.LK.trim() !== '') {
      const lower = price.LK.toLowerCase();
      if (lower.includes('contact') || lower.includes('inquire') || lower.includes('unpriced')) {
        return 'Contact for Price';
      }
      return price.LK;
    }

    // 2. Computed from GLOBAL
    if (price.GLOBAL && price.GLOBAL.trim() !== '') {
      const computed = calculateLkrFromGlobal(price.GLOBAL, fxRate);
      if (computed) return computed;
    }

    return 'Contact for Price';
  }

  // GLOBAL region
  // 1. Manual GLOBAL override
  if (price.GLOBAL && price.GLOBAL.trim() !== '') {
    const lower = price.GLOBAL.toLowerCase();
    if (lower.includes('contact') || lower.includes('inquire') || lower.includes('unpriced')) {
      return 'Contact for Price';
    }
    return price.GLOBAL;
  }

  // 2. Computed from LK using 330 FX rate
  if (price.LK && price.LK.trim() !== '') {
    const computed = calculateGlobalFromLkr(price.LK, fxRate);
    if (computed) return computed;
    return price.LK;
  }

  return 'Contact for Price';
}

/**
 * Check if a product/plan has a price available for the given region.
 */
export function hasPriceForRegion(price: ProductPrice | undefined, _region: PricingRegion): boolean {
  if (!price) return false;
  return !isUnpriced(price);
}

/**
 * Extract numeric value from a price string for sorting.
 */
export function parsePriceNumeric(priceStr: string): number {
  const val = extractNumericValue(priceStr);
  return val ?? 0;
}

/**
 * Get the region label string.
 */
export function getRegionLabel(region: PricingRegion): string {
  return region === 'LK' ? '🇱🇰 Sri Lanka' : '🌍 Global';
}
