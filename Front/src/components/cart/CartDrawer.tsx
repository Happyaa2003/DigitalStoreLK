import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingCart, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { usePricingStore } from '@/stores/pricingStore';
import storeConfig from '@/config/storeConfig.json';
import { getPrice } from '@/utils/pricing';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart } = useCartStore();
  const { region } = usePricingStore();

  const generateWhatsAppMessage = () => {
    let msg = `Hello ${storeConfig.shopName}! I would like to place an order:%0A%0A`;
    items.forEach((item, index) => {
      const price = getPrice(item.selectedPlan.price, region);
      msg += `${index + 1}. *${item.product.name}* (${item.selectedPlan.name})%0A`;
      msg += `   Qty: ${item.quantity} | Price: ${price}%0A`;
    });
    msg += `%0APlease confirm availability and payment details. Thank you!`;
    return `${storeConfig.whatsappUrl}?text=${msg}`;
  };

  const generateTelegramMessage = () => {
    let msg = `Hello ${storeConfig.shopName}! I would like to place an order:\n\n`;
    items.forEach((item, index) => {
      const price = getPrice(item.selectedPlan.price, region);
      msg += `${index + 1}. ${item.product.name} (${item.selectedPlan.name})\n`;
      msg += `   Qty: ${item.quantity} | Price: ${price}\n`;
    });
    msg += `\nPlease confirm availability and payment details. Thank you!`;
    return `${storeConfig.telegramUrl}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-[#0b1325] text-slate-900 dark:text-white shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                  <ShoppingCart size={20} />
                </div>
                <h3 className="font-extrabold text-lg">Your Cart ({items.length})</h3>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                  <ShoppingCart size={48} className="mb-3 opacity-30" />
                  <p className="font-bold text-base text-slate-700 dark:text-slate-300">Your cart is empty</p>
                  <p className="text-sm mt-1">Browse our premium digital products to get started.</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-bold shadow-md shadow-blue-500/20 transition-all"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedPlan.id}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#131d33] border border-slate-200/80 dark:border-white/5"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-contain bg-white dark:bg-black/20 p-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{item.product.name}</h4>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                        {item.selectedPlan.name} • {getPrice(item.selectedPlan.price, region)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center bg-white dark:bg-black/30 rounded-lg border border-slate-200 dark:border-white/10 px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedPlan.id, item.quantity - 1)}
                            className="px-1.5 py-0.5 text-xs font-bold hover:text-blue-500"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedPlan.id, item.quantity + 1)}
                            className="px-1.5 py-0.5 text-xs font-bold hover:text-blue-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedPlan.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Checkout Options */}
            {items.length > 0 && (
              <div className="p-5 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#0e172a] space-y-3">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <MessageCircle size={18} />
                  Order via WhatsApp
                  <ArrowRight size={16} />
                </a>

                <a
                  href={generateTelegramMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-2.5 px-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-lg shadow-blue-600/25 transition-all"
                >
                  <Send size={16} />
                  Order via Telegram
                </a>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 pt-1"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
