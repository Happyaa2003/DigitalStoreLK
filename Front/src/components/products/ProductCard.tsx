import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, Clock } from 'lucide-react';
import type { Product, ProductPlan, PricingRegion } from '@/types';
import { getPrice } from '@/utils/pricing';
import { createWhatsAppLink, createTelegramLink } from '@/utils/whatsapp';
import { cn } from '@/utils/cn';
import DiscountBadge from './DiscountBadge';

interface ProductCardProps {
  product: Product;
  region: PricingRegion;
  onViewDetails: (product: Product) => void;
  variant?: 'default' | 'featured' | 'compact';
}

const categoryColors: Record<string, string> = {
  ai: 'text-indigo-600 bg-indigo-50',
  gaming: 'text-purple-600 bg-purple-50',
  developer: 'text-blue-600 bg-blue-50',
  education: 'text-sky-600 bg-sky-50',
  subscriptions: 'text-amber-600 bg-amber-50',
  wallet: 'text-emerald-600 bg-emerald-50',
};

const categoryLabels: Record<string, string> = {
  ai: 'AI & Productivity',
  gaming: 'Gaming',
  developer: 'Developer Tools',
  education: 'Education',
  subscriptions: 'Subscriptions',
  wallet: 'PS Wallet',
};

const badgeStyle: Record<string, string> = {
  POPULAR: 'badge-popular',
  'HOT DEAL': 'badge-hot',
  NEW: 'badge-new',
  'BEST VALUE': 'badge-best',
  LIMITED: 'badge-limited',
};

export default function ProductCard({ product, region, onViewDetails, variant = 'default' }: ProductCardProps) {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedPlan: ProductPlan = product.plans[selectedPlanIndex] ?? product.plans[0];

  const currentPrice = getPrice(selectedPlan.price, region);
  const normalPrice = getPrice(selectedPlan.normalPrice ?? selectedPlan.discount?.normalPrice, region);
  const discount = selectedPlan.discount ?? (selectedPlan.discount === undefined
    ? undefined
    : undefined);
  const hasDiscount = discount?.enabled && discount.label;
  const hasNormalPrice = !!normalPrice && normalPrice !== currentPrice;
  const hasMultiplePlans = product.plans.length > 1;

  const currentImage = selectedPlan?.image || product.image;
  const whatsappLink = createWhatsAppLink(product, selectedPlan, region);
  const telegramLink = createTelegramLink(product, selectedPlan, region);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1 hover:border-gray-200',
        variant === 'featured' && 'shadow-md',
      )}
    >
      {/* Product image - 1:1 ratio */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square w-full">
        <img
          key={currentImage}
          src={currentImage}
          alt={`${product.name} - ${selectedPlan.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallback = parent.querySelector('.img-fallback') as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }
          }}
        />
        {/* Image fallback */}
        <div
          className="img-fallback absolute inset-0 items-center justify-center text-4xl font-black text-gray-200 tracking-tighter hidden"
        >
          {product.name.substring(0, 2).toUpperCase()}
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3">
            <DiscountBadge label={discount!.label!} />
          </div>
        )}

        {/* Product badge */}
        {product.badge && !hasDiscount && (
          <div className={cn(
            'absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide',
            badgeStyle[product.badge] ?? 'bg-gray-800 text-white'
          )}>
            {product.badge}
          </div>
        )}

        {/* Availability indicator */}
        {!product.available && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category + Duration */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={cn(
            'text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full',
            categoryColors[product.category] ?? 'text-gray-600 bg-gray-100'
          )}>
            {categoryLabels[product.category] ?? product.category}
          </span>
          {selectedPlan.duration && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={11} />
              <span>{selectedPlan.duration}</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-tight">{product.name}</h3>

        {/* Short description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Plan selector — only show if multiple plans */}
        {hasMultiplePlans && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.plans.map((plan, idx) => (
              <button
                key={plan.id}
                id={`plan-${plan.id}`}
                onClick={() => setSelectedPlanIndex(idx)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all duration-200',
                  selectedPlanIndex === idx
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                )}
              >
                {plan.name}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-end gap-2.5 mb-4">
          {currentPrice ? (
            <>
              <span className="price-display">{currentPrice}</span>
              {hasNormalPrice && (
                <span className="price-original mb-0.5">{normalPrice}</span>
              )}
            </>
          ) : (
            <span className="text-sm text-gray-400 italic">Contact for pricing</span>
          )}
        </div>

        {/* Activation */}
        {(selectedPlan.activation ?? product.activation) && (
          <div className="flex items-center gap-1.5 mb-4 text-xs text-gray-400">
            <Zap size={11} className="text-yellow-400 flex-shrink-0" />
            <span className="truncate">{selectedPlan.activation ?? product.activation}</span>
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex items-center gap-1.5 mt-auto pt-2">
          <button
            id={`view-${product.id}`}
            onClick={() => onViewDetails(product)}
            className="btn-secondary flex-1 !py-2.5 !px-2 !text-xs font-semibold group justify-center"
            aria-label={`View details for ${product.name}`}
          >
            <Eye size={14} className="group-hover:scale-110 transition-transform" />
            <span>Details</span>
          </button>
          {product.available !== false && (
            <>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                id={`order-wa-${product.id}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 active:scale-95 flex-1"
                aria-label={`Order ${product.name} via WhatsApp`}
                title="Order via WhatsApp"
              >
                <img src="/assets/brand/whatsapp-color-icon.svg" alt="WhatsApp" className="w-3.5 h-3.5 object-contain" />
                <span>Order</span>
              </a>
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                id={`order-tg-${product.id}`}
                className="flex items-center justify-center p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                aria-label={`Order ${product.name} via Telegram`}
                title="Order via Telegram"
              >
                <img src="/assets/brand/telegram-icon.svg" alt="Telegram" className="w-4 h-4 object-contain" />
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
