import type { Product, ProductPlan, PricingRegion } from '@/types';
import storeConfigData from '@/config/storeConfig.json';
import { getPrice } from './pricing';

const storeConfig = storeConfigData as {
  whatsappNumber: string;
  whatsappUrl: string;
  telegramUsername?: string;
  telegramUrl?: string;
};

/**
 * Builds standard order inquiry message
 */
function buildOrderMessage(product: Product, plan?: ProductPlan, region: PricingRegion = 'LK'): string {
  const selectedPlan = plan ?? product.plans[0];
  const planName = selectedPlan?.name ?? '';
  const duration = selectedPlan?.duration ? ` (${selectedPlan.duration})` : '';
  if (selectedPlan?.available === false) {
    return `Hi DigitalStoreLK, I would like to inquire about restock / availability for:\n\n📦 Product: ${product.name}\n📋 Plan: ${planName}${duration}\n\nPlease let me know when this plan will be available again or if alternatives are recommended.`;
  }

  const price = getPrice(selectedPlan?.price, region);
  const pricePart = price && price !== 'Contact for Price' ? ` for ${price}` : ' (Price Inquiry)';

  return `Hi DigitalStoreLK, I would like to order:\n\n📦 Product: ${product.name}\n📋 Plan: ${planName}${duration}\n💰 Price: ${pricePart}\n\nPlease let me know how to proceed with payment and activation.`;
}

/**
 * Creates a properly encoded WhatsApp message URL for a given product and plan.
 */
export function createWhatsAppLink(product: Product, plan?: ProductPlan, region: PricingRegion = 'LK'): string {
  const message = buildOrderMessage(product, plan, region);
  return `${storeConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates a properly encoded Telegram message URL for a given product and plan.
 */
export function createTelegramLink(product: Product, plan?: ProductPlan, region: PricingRegion = 'LK'): string {
  const message = buildOrderMessage(product, plan, region);
  const baseTelegram = storeConfig.telegramUrl ?? 'https://t.me/DigitalStoreLK';
  return `${baseTelegram}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns the base WhatsApp link with a general greeting.
 */
export function getWhatsAppChatLink(customMessage?: string): string {
  const message = customMessage ?? 'Hi DigitalStoreLK, I would like to browse your products and have a question.';
  return `${storeConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns the base Telegram link with a general greeting.
 */
export function getTelegramChatLink(customMessage?: string): string {
  const baseTelegram = storeConfig.telegramUrl ?? 'https://t.me/DigitalStoreLK';
  if (customMessage) {
    return `${baseTelegram}?text=${encodeURIComponent(customMessage)}`;
  }
  return baseTelegram;
}
