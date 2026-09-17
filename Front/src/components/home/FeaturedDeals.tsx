import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Star, Clock } from 'lucide-react';
import productsData from '@/data/products.json';
import type { Product, PricingRegion } from '@/types';
import { getPrice } from '@/utils/pricing';
import { createWhatsAppLink } from '@/utils/whatsapp';
import { usePricingStore } from '@/stores/pricingStore';
import ProductModal from '../products/ProductModal';
import DiscountBadge from '../products/DiscountBadge';

const products = productsData as Product[];
const featured = products.filter((p) => p.featured && p.available !== false).slice(0, 5);

function FeaturedLargeCard({ product, region, onView }: { product: Product; region: PricingRegion; onView: () => void }) {
  const plan = product.plans[0];
  const price = getPrice(plan.price, region);
  const normalPrice = getPrice(plan.normalPrice ?? plan.discount?.normalPrice, region);
  const hasDiscount = plan.discount?.enabled && plan.discount.label;
  const whatsapp = createWhatsAppLink(product, plan);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl lg:col-span-2 lg:row-span-2"
    >
      {/* Background image */}
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105 transition-transform"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-gray-900/70 to-gray-900/90" />

      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

      <div className="relative p-7 sm:p-9 h-full flex flex-col justify-between min-h-[340px]">
        <div>
          {hasDiscount && (
            <div className="mb-4">
              <DiscountBadge label={plan.discount!.label!} />
            </div>
          )}
          {product.badge && !hasDiscount && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Star size={10} />
              {product.badge}
            </div>
          )}
          <div className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            Featured Deal
          </div>
          <h3 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">{product.name}</h3>
          <p className="text-white/70 text-base max-w-sm leading-relaxed mb-4">{product.shortDescription}</p>

          {plan.duration && (
            <div className="flex items-center gap-1.5 text-white/50 text-sm mb-2">
              <Clock size={13} />
              {plan.duration}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black">{price || 'Contact'}</span>
              {normalPrice && normalPrice !== price && (
                <span className="text-lg text-white/40 line-through mb-0.5">{normalPrice}</span>
              )}
            </div>
            <div className="text-white/40 text-xs mt-1">
              {region === 'LK' ? '🇱🇰 Sri Lanka' : '🌍 Global'}
            </div>
          </div>
          <div className="flex gap-2.5 sm:ml-auto flex-wrap">
            <button
              onClick={onView}
              className="btn-secondary !text-white !border-white/20 hover:!bg-white/10 hover:!border-white/40 !py-2.5 !px-5 !text-sm"
            >
              Details
            </button>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              id={`featured-order-${product.id}`}
              className="btn-whatsapp !py-2.5 !px-5 !text-sm"
            >
              <MessageCircle size={15} />
              Order Now
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedSmallCard({ product, region, onView, delay = 0 }: { product: Product; region: PricingRegion; onView: () => void; delay?: number }) {
  const plan = product.plans[0];
  const price = getPrice(plan.price, region);
  const hasDiscount = plan.discount?.enabled && plan.discount.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image - 1:1 ratio */}
      <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        {hasDiscount && (
          <div className="absolute top-3 left-3">
            <DiscountBadge label={plan.discount!.label!} />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{product.shortDescription}</p>

        {plan.duration && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
            <Clock size={10} />
            {plan.duration}
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-black text-gray-900">{price || 'Contact'}</span>
          <div className="flex gap-1.5">
            <button
              onClick={onView}
              className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-all text-xs"
              aria-label={`View ${product.name} details`}
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedDeals() {
  const { region } = usePricingStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (featured.length === 0) return null;

  const [mainProduct, ...rest] = featured;

  return (
    <>
      <section className="section-pad bg-white">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <div className="section-label mb-2">Hand-Picked Deals</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Featured Deals
              </h2>
            </div>
            <a
              href="/products"
              className="btn-secondary !text-sm group"
            >
              View All
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Large featured card */}
            <FeaturedLargeCard
              product={mainProduct}
              region={region}
              onView={() => setSelectedProduct(mainProduct)}
            />

            {/* Smaller cards */}
            <div className="flex flex-col gap-5">
              {rest.slice(0, 4).map((product, i) => (
                <FeaturedSmallCard
                  key={product.id}
                  product={product}
                  region={region}
                  onView={() => setSelectedProduct(product)}
                  delay={0.1 * (i + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        region={region}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
