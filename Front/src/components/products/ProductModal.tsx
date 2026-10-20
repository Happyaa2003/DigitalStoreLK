import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShoppingCart } from 'lucide-react';
import type { Product, Plan, PricingRegion } from '@/types';
import { getPrice } from '@/utils/pricing';
import { createWhatsAppLink, createTelegramLink } from '@/utils/whatsapp';
import { usePricingStore } from '@/stores/pricingStore';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/utils/cn';
import { getAssetUrl } from '@/utils/assets';
import { WhatsAppIcon, TelegramIcon } from '@/components/common/BrandIcons';

interface ProductModalProps {
  product: Product | null;
  region?: PricingRegion;
  initialPlanIndex?: number;
  isOpen?: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  region: propRegion,
  initialPlanIndex = 0,
  onClose,
}: ProductModalProps) {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(initialPlanIndex);
  const { region: storeRegion } = usePricingStore();
  const { addItem } = useCartStore();
  const region = propRegion || storeRegion;

  useEffect(() => {
    setSelectedPlanIndex(initialPlanIndex);
  }, [product?.id, initialPlanIndex]);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
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

  const selectedPlan: Plan = product.plans[selectedPlanIndex] ?? product.plans[0];
  const currentPrice = getPrice(selectedPlan?.price, region);
  const currentImage = getAssetUrl(selectedPlan?.image || product.image);
  const whatsappLink = createWhatsAppLink(product, selectedPlan, region);
  const telegramLink = createTelegramLink(product, selectedPlan, region);

  const handleAddToCart = () => {
    addItem(product, selectedPlan, 1);
  };

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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full sm:max-w-xl max-h-[90vh] sm:max-h-[85vh] bg-white dark:bg-[#0c1527] text-slate-900 dark:text-white sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-white/10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              id="product-modal-close"
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
              aria-label="Close product details"
            >
              <X size={18} />
            </button>

            {/* Header image preview — 1:1 Aspect Ratio */}
            <div className="relative flex-shrink-0 w-full flex items-center justify-center bg-slate-50 dark:bg-black/30 p-4 sm:p-5 border-b border-slate-100 dark:border-white/10">
              <div className="w-40 h-40 sm:w-48 sm:h-48 aspect-square rounded-2xl overflow-hidden bg-slate-900/5 dark:bg-black/40 border border-slate-200/60 dark:border-white/10 shadow-inner flex items-center justify-center p-2">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
            </div>

            {/* Scrollable details body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 uppercase tracking-wider mb-2">
                  {product.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {product.description || product.shortDescription}
                </p>
              </div>

              {/* Plans selection (if more than 1) */}
              {product.plans.length > 1 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Select Plan
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {product.plans.map((plan, idx) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlanIndex(idx)}
                        className={cn(
                          'p-3 rounded-2xl border text-left transition-all',
                          selectedPlanIndex === idx
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300 shadow-sm'
                            : 'border-slate-200 dark:border-white/10 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                        )}
                      >
                        <div className="font-extrabold text-xs">{plan.name}</div>
                        <div className="text-[11px] font-bold mt-1 text-slate-900 dark:text-white">
                          {getPrice(plan.price, region)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Activation Info Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Price
                  </span>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {currentPrice}
                  </div>
                </div>

                {selectedPlan.activation && (
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Activation
                    </span>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {selectedPlan.activation}
                    </div>
                  </div>
                )}
              </div>

              {/* Features list */}
              {product.features && product.features.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    What's Included
                  </p>
                  <ul className="space-y-2">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action buttons footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#070e1c] flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-extrabold text-xs shadow-sm transition-all"
              >
                <ShoppingCart size={15} />
                <span>Add to Cart</span>
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white flex-shrink-0" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition-all"
              >
                <TelegramIcon className="w-4 h-4 fill-white flex-shrink-0" />
                <span>Order on Telegram</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
