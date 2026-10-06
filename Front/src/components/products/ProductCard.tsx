import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, Clock } from 'lucide-react';
import type { Product, ProductPlan, PricingRegion } from '@/types';
import { getPrice } from '@/utils/pricing';
import { createWhatsAppLink, createTelegramLink } from '@/utils/whatsapp';
import { cn } from '@/utils/cn';
import { getAssetUrl } from '@/utils/assets';
import { WhatsAppIcon, TelegramIcon } from '@/components/common/BrandIcons';
import DiscountBadge from './DiscountBadge';

interface ProductCardProps {
  product: Product;
  region: PricingRegion;
  onViewDetails: (product: Product, planIndex?: number) => void;
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
  POPULAR: 'bg-blue-600 text-white shadow-sm shadow-blue-500/30',
  'HOT DEAL': 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm shadow-red-500/30',
  NEW: 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30',
  'BEST VALUE': 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-500/30',
  'NEW AI TOOL': 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm shadow-purple-500/30',
  'SPECIAL OFFER': 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-sm shadow-orange-500/30 font-extrabold animate-pulse',
  'GAMING SALE': 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm shadow-green-500/30',
  'BEST FOR DEVS': 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-sm shadow-sky-500/30',
  LIMITED: 'bg-amber-500 text-white shadow-sm shadow-amber-500/30',
  LEARNING: 'bg-blue-600 text-white shadow-sm shadow-blue-500/30',
  AUTOMATION: 'bg-rose-600 text-white shadow-sm shadow-rose-500/30',
  'xAI POWER': 'bg-gradient-to-r from-gray-800 to-black text-white border border-white/20',
  'ULTIMATE COMPUTE': 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white',
  INQUIRE: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm shadow-emerald-500/30',
  'SERVER 2025': 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-sm shadow-blue-500/30',
  '4K UHD': 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-sm shadow-red-500/30',
  'CREATOR PICK': 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm shadow-pink-500/30',
  'CAREER BOOST': 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-sm shadow-blue-500/30',
  '5 DEVICES + 1TB': 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm shadow-orange-500/30',
  '46+ APPS': 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-sm shadow-teal-500/30',
  'ALL APPS': 'bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white shadow-sm shadow-rose-500/30',
  'LAST 12 ACCOUNTS': 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-sm shadow-orange-500/30 font-extrabold animate-pulse',
  'LAST 12 ACC': 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-sm shadow-orange-500/30 font-extrabold animate-pulse',
};

const whiteBgProductIds = new Set(['udemy-personal', 'n8n-starter', 'coursera-plus', 'adobe-creative-cloud-all-apps']);

export default function ProductCard({ product, region, onViewDetails, variant = 'default' }: ProductCardProps) {
  const defaultPlanIndex = Math.max(0, product.plans.findIndex((p) => p.available !== false));
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(defaultPlanIndex);
  const selectedPlan: ProductPlan = product.plans[selectedPlanIndex] ?? product.plans[0];
  const isPlanAvailable = selectedPlan.available !== false;

  const currentPrice = getPrice(selectedPlan.price, region);
  const normalPrice = getPrice(selectedPlan.normalPrice ?? selectedPlan.discount?.normalPrice, region);
  const discount = selectedPlan.discount ?? (selectedPlan.discount === undefined
    ? undefined
    : undefined);
  const hasDiscount = discount?.enabled && discount.label;
  const hasNormalPrice = !!normalPrice && normalPrice !== currentPrice;
  const hasMultiplePlans = product.plans.length > 1;

  const isWhiteBg = whiteBgProductIds.has(product.id);
  const currentImage = getAssetUrl(selectedPlan?.image || product.image);
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
      {/* Product image - 1:1 ratio with object-contain to prevent cropping */}
      <div
        onClick={() => onViewDetails(product, selectedPlanIndex)}
        className={cn(
          'relative overflow-hidden aspect-square w-full cursor-pointer flex items-center justify-center',
          isWhiteBg ? 'bg-white' : 'bg-slate-950'
        )}
      >
        <img
          key={currentImage}
          src={currentImage}
          alt={`${product.name} - ${selectedPlan.name}`}
          className="w-full h-full object-contain p-0.5 transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          onLoad={(e) => {
            e.currentTarget.style.display = 'block';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallback = parent.querySelector('.img-fallback') as HTMLElement | null;
              if (fallback) fallback.style.display = 'none';
            }
          }}
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

        {/* Discount badge - located at top-right corner */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 z-10">
            <DiscountBadge label={discount!.label!} />
          </div>
        )}

        {/* Product badge - located at top-right corner */}
        {product.badge && !hasDiscount && (
          <div className={cn(
            'absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide backdrop-blur-md shadow-md',
            badgeStyle[product.badge] ?? 'bg-gray-900/90 text-white border border-white/10'
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
        <h3
          onClick={() => onViewDetails(product, selectedPlanIndex)}
          className="text-base font-bold text-gray-900 mb-1.5 leading-tight cursor-pointer hover:text-blue-600 transition-colors"
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Plan selector — only show if multiple plans */}
        {hasMultiplePlans && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.plans.map((plan, idx) => {
              const isPlanOutOfStock = plan.available === false;
              return (
                <button
                  key={plan.id}
                  id={`plan-${plan.id}`}
                  onClick={() => setSelectedPlanIndex(idx)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all duration-200 flex items-center gap-1',
                    selectedPlanIndex === idx
                      ? isPlanOutOfStock
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-blue-600 text-white border-blue-600'
                      : isPlanOutOfStock
                        ? 'bg-rose-50 text-rose-600/90 border-rose-200 hover:border-rose-300'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  )}
                >
                  <span>{plan.name}</span>
                  {isPlanOutOfStock && (
                    <span className={cn(
                      'text-[9px] font-bold uppercase px-1 py-0.2 rounded',
                      selectedPlanIndex === idx ? 'bg-black/20 text-white' : 'bg-rose-100 text-rose-700'
                    )}>
                      Out of Stock
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          {currentPrice ? (
            <>
              <span className={cn('price-display', !isPlanAvailable && 'text-gray-400 line-through')}>{currentPrice}</span>
              {hasNormalPrice && (
                <span className="price-original mb-0.5">{normalPrice}</span>
              )}
            </>
          ) : (
            <span className="text-sm text-gray-400 italic">Contact for pricing</span>
          )}
          {!isPlanAvailable && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
              Out of Stock
            </span>
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
            onClick={() => onViewDetails(product, selectedPlanIndex)}
            className="btn-secondary flex-1 !py-2.5 !px-2 !text-xs font-semibold group justify-center"
            aria-label={`View details for ${product.name}`}
          >
            <Eye size={14} className="group-hover:scale-110 transition-transform" />
            <span>Details</span>
          </button>
          {product.available !== false && (
            isPlanAvailable ? (
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
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white flex-shrink-0" />
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
                  <TelegramIcon className="w-4 h-4 flex-shrink-0" />
                </a>
              </>
            ) : (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                id={`order-wa-${product.id}`}
                className="flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all border border-gray-200 flex-1"
                aria-label={`Inquire about ${product.name} restock via WhatsApp`}
                title="Inquire about restock via WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-gray-500 opacity-80 flex-shrink-0" />
                <span>Inquire</span>
              </a>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}
