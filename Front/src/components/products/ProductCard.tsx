import { useState } from 'react';
import { Star, ShoppingCart, Lock } from 'lucide-react';
import type { Product, Plan } from '@/types';
import { getPrice } from '@/utils/pricing';
import { createWhatsAppLink, createTelegramLink } from '@/utils/whatsapp';
import { usePricingStore } from '@/stores/pricingStore';
import { useCartStore } from '@/stores/cartStore';
import { WhatsAppIcon, TelegramIcon } from '@/components/common/BrandIcons';
import { getAssetUrl } from '@/utils/assets';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product, planIndex?: number) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPlanIndex] = useState(0);
  const { region } = usePricingStore();
  const { items, addItem, openCart } = useCartStore();

  const selectedPlan: Plan = product.plans[selectedPlanIndex] ?? {
    id: `${product.id}-default`,
    name: '1 Month',
    duration: '1 Month',
    price: { LK: 'Contact for Price', GLOBAL: 'Contact for Price' },
    description: product.shortDescription,
  };

  const currentPrice = getPrice(selectedPlan.price, region);
  const whatsappLink = createWhatsAppLink(product, selectedPlan, region);
  const telegramLink = createTelegramLink(product, selectedPlan, region);

  // Check if this product is already added to cart
  const inCart = items.some((i) => i.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedPlan, quantity);
  };

  const handleShowCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCart();
  };

  // Determine badge text
  const badgeText = product.badge || (product.featured ? 'Popular' : 'New');

  return (
    <div
      onClick={() => onViewDetails && onViewDetails(product, selectedPlanIndex)}
      className="group relative rounded-3xl bg-white dark:bg-[#0c1527] border border-slate-200/90 dark:border-white/10 p-3 sm:p-3.5 shadow-sm hover:shadow-md dark:hover:border-blue-500/40 transition-all duration-200 flex flex-col cursor-pointer overflow-hidden"
    >
      {/* Top Badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-sm">
          <Star size={10} className="fill-white" />
          <span>{badgeText}</span>
        </div>
      </div>

      {/* Product Image Area — 1:1 Aspect Ratio */}
      <div className="w-full aspect-square rounded-2xl overflow-hidden mb-2.5 relative bg-slate-900 shadow-sm border border-slate-100 dark:border-white/5">
        <img
          src={getAssetUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Title & Duration */}
      <div className="mb-2 flex-1">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight truncate">
          {product.name}
        </h3>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {selectedPlan.duration || selectedPlan.name}
        </p>

        {/* Feature highlight */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-1 truncate">
          <Lock size={11} className="text-blue-500 flex-shrink-0" />
          <span className="truncate">
            {product.features?.[0] || product.activation || 'Instant Digital Delivery'}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-2.5">
        <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
          {currentPrice}
        </div>
      </div>

      {/* Actions Row: Stepper, Add to Cart / Show Cart, WhatsApp, Telegram */}
      <div
        className="flex items-center gap-1.5 sm:gap-2 pt-2.5 border-t border-slate-100 dark:border-white/5 w-full mt-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Quantity Stepper */}
        <div className="flex items-center bg-slate-100 dark:bg-black/40 rounded-xl px-2 py-1 text-xs font-bold border border-slate-200/80 dark:border-white/10 flex-shrink-0">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white px-1 text-xs leading-none"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-1.5 text-xs text-slate-800 dark:text-slate-200 leading-none">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white px-1 text-xs leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Dynamic Cart Button */}
        {inCart ? (
          <button
            onClick={handleShowCart}
            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm shadow-blue-500/25 transition-all whitespace-nowrap"
            title="Open Cart"
          >
            <ShoppingCart size={13} className="flex-shrink-0" />
            <span className="whitespace-nowrap">Show Cart</span>
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold text-xs shadow-sm transition-all whitespace-nowrap"
            title="Add to Cart"
          >
            <ShoppingCart size={13} className="flex-shrink-0" />
            <span className="whitespace-nowrap">Add to Cart</span>
          </button>
        )}

        {/* Direct WhatsApp Order */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
          title="Order via WhatsApp"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
        </a>

        {/* Direct Telegram Order */}
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
          title="Order via Telegram"
        >
          <TelegramIcon className="w-3.5 h-3.5 fill-white" />
        </a>
      </div>
    </div>
  );
}
