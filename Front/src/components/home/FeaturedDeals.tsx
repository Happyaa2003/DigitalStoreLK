import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { useProductStore } from '@/stores/productStore';
import ProductCard from '../products/ProductCard';
import ProductModal from '../products/ProductModal';

export default function FeaturedDeals() {
  const { products } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);

  // Get the 6 featured products (matching the screenshot)
  const featuredIds = [
    'chatgpt-plus',
    'windows-11-pro',
    'coursera-plus',
    'adobe-creative-cloud-all-apps',
    'office-365-plus',
    'google-ai-pro',
  ];

  // Pick the 6 items in this order, or fall back to first 6
  let displayProducts = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  if (displayProducts.length < 6) {
    displayProducts = products.slice(0, 6);
  }

  return (
    <>
      <section id="trending-products" className="py-6 sm:py-8">
        <div className="container-main">
          {/* Header Row: Title on Left, View All on Right */}
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star size={20} className="text-blue-400 fill-blue-400" />
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Featured Products
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Top picks. Best deals. Trusted by thousands.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-600/30 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-white/5 text-xs font-bold transition-all shadow-sm flex-shrink-0"
            >
              <span>View All Products</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* 6 Products Grid — Spacious 3-Column Layout on Full View so cards are large and prominent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(p, idx) => {
                  setSelectedProduct(p);
                  setSelectedPlanIndex(idx ?? 0);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          initialPlanIndex={selectedPlanIndex}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
