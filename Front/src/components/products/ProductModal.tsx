import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Clock, Zap, ChevronRight } from 'lucide-react';
import type { Product, ProductPlan, PricingRegion } from '@/types';
import { getPrice } from '@/utils/pricing';
import { createWhatsAppLink, createTelegramLink } from '@/utils/whatsapp';
import { cn } from '@/utils/cn';
import DiscountBadge from './DiscountBadge';

interface ProductModalProps {
  product: Product | null;
  region: PricingRegion;
  initialPlanIndex?: number;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  ai: 'AI & Productivity',
  gaming: 'Gaming',
  developer: 'Developer Tools',
  education: 'Education',
  subscriptions: 'Subscriptions',
  wallet: 'PS Wallet',
};

export default function ProductModal({ product, region, initialPlanIndex = 0, onClose }: ProductModalProps) {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(initialPlanIndex);

  useEffect(() => {
    setSelectedPlanIndex(initialPlanIndex);
  }, [product?.id, initialPlanIndex]);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!product) return null;

  const selectedPlan: ProductPlan = product.plans[selectedPlanIndex] ?? product.plans[0];
  const currentPrice = getPrice(selectedPlan.price, region);
  const normalPrice = getPrice(selectedPlan.normalPrice ?? selectedPlan.discount?.normalPrice, region);
  const discount = selectedPlan.discount;
  const hasDiscount = discount?.enabled && discount.label;
  const hasNormalPrice = !!normalPrice && normalPrice !== currentPrice;
  const currentImage = selectedPlan?.image || product.image;
  const whatsappLink = createWhatsAppLink(product, selectedPlan, region);
  const telegramLink = createTelegramLink(product, selectedPlan, region);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} details`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-white sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              id="product-modal-close"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
              aria-label="Close product details"
            >
              <X size={18} />
            </button>

            {/* Header image - 1:1 friendly container */}
            <div className="relative flex-shrink-0 w-full bg-slate-950 flex items-center justify-center overflow-hidden max-h-64 sm:max-h-80">
              <img
                key={currentImage}
                src={currentImage}
                alt={`${product.name} - ${selectedPlan.name}`}
                className="w-full h-full object-contain max-h-64 sm:max-h-80"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {hasDiscount && (
                <div className="absolute top-4 left-4">
                  <DiscountBadge label={discount!.label!} />
                </div>
              )}
              {/* Category chip */}
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-semibold text-white bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {categoryLabels[product.category] ?? product.category}
                </span>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 sm:p-7">
                {/* Name */}
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{product.name}</h2>
                {product.description && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.description}</p>
                )}

                {/* Plan selector */}
                {product.plans.length > 1 && (
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                      Select Plan
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.plans.map((plan, idx) => (
                        <button
                          key={plan.id}
                          id={`modal-plan-${plan.id}`}
                          onClick={() => setSelectedPlanIndex(idx)}
                          className={cn(
                            'flex-1 min-w-[120px] px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 text-left',
                            selectedPlanIndex === idx
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'
                          )}
                        >
                          <div className="font-bold mb-0.5">{plan.name}</div>
                          {plan.duration && (
                            <div className="text-[11px] opacity-70 font-normal">{plan.duration}</div>
                          )}
                          {plan.description && (
                            <div className="text-[11px] opacity-60 font-normal mt-0.5 line-clamp-1">{plan.description}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Single plan description */}
                {product.plans.length === 1 && selectedPlan.description && (
                  <div className="mb-4 px-4 py-3 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-700">{selectedPlan.description}</p>
                  </div>
                )}

                {/* Duration + activation row */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {selectedPlan.duration && (
                    <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 rounded-xl">
                      <Clock size={16} className="text-gray-400 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Duration</div>
                        <div className="text-sm font-semibold text-gray-800">{selectedPlan.duration}</div>
                      </div>
                    </div>
                  )}
                  {(selectedPlan.activation ?? product.activation) && (
                    <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 rounded-xl">
                      <Zap size={16} className="text-yellow-500 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Activation</div>
                        <div className="text-sm font-semibold text-gray-800 leading-tight">
                          {selectedPlan.activation ?? product.activation}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 mb-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div>
                    <div className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mb-1">
                      {region === 'LK' ? '🇱🇰 Sri Lanka Price' : '🌍 Global Price'}
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black text-gray-900">
                        {currentPrice || 'Contact for price'}
                      </span>
                      {hasNormalPrice && (
                        <span className="text-base font-medium text-gray-400 line-through mb-0.5">
                          {normalPrice}
                        </span>
                      )}
                    </div>
                    {hasDiscount && (
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        🎉 {discount!.label} applied
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      What's Included
                    </p>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes */}
                {product.notes && product.notes.length > 0 && (
                  <div className="mb-5 px-4 py-4 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                      Important Notes
                    </p>
                    <ul className="space-y-1.5">
                      {product.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
                          <ChevronRight size={12} className="flex-shrink-0 mt-0.5" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky CTA footer */}
            <div className="flex-shrink-0 p-5 border-t border-gray-100 bg-white">
              {product.available !== false ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`modal-order-${product.id}-whatsapp`}
                    className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-98"
                  >
                    <img src="/assets/brand/whatsapp-color-icon.svg" alt="WhatsApp" className="w-5 h-5 object-contain" />
                    <span>Order via WhatsApp</span>
                  </a>
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`modal-order-${product.id}-telegram`}
                    className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/20 transition-all active:scale-98"
                  >
                    <img src="/assets/brand/telegram-icon.svg" alt="Telegram" className="w-5 h-5 object-contain" />
                    <span>Order via Telegram</span>
                  </a>
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500 py-2">
                  This product is currently unavailable. Contact us on WhatsApp or Telegram for alternatives.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
