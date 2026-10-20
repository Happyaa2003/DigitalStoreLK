import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown } from 'lucide-react';
import type { Product } from '@/types';
import { getPrice, parsePriceNumeric } from '@/utils/pricing';
import { usePricingStore } from '@/stores/pricingStore';
import { useProductStore } from '@/stores/productStore';
import { cn } from '@/utils/cn';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const categoryFilters = [
  { id: 'all', label: 'All Products' },
  { id: 'ai', label: 'AI' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'developer', label: 'Developer' },
  { id: 'education', label: 'Education' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'wallet', label: 'PS Wallet' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low → High' },
  { id: 'price-desc', label: 'Price: High → Low' },
];

interface ProductGridProps {
  initialCategory?: string;
  showFilters?: boolean;
  showHeading?: boolean;
  limit?: number;
}

export default function ProductGrid({
  initialCategory = 'all',
  showFilters = true,
  showHeading = true,
  limit,
}: ProductGridProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  const { region } = usePricingStore();
  const { products } = useProductStore();

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.plans.some((pl) => pl.name.toLowerCase().includes(q));
      return matchesCategory && matchesQuery && p.available !== false;
    });

    // Sort
    if (sortBy === 'featured') {
      result = result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.order ?? 99) - (b.order ?? 99);
      });
    } else {
      result = result.sort((a, b) => {
        const aPrice = parsePriceNumeric(getPrice(a.plans[0]?.price, region));
        const bPrice = parsePriceNumeric(getPrice(b.plans[0]?.price, region));
        return sortBy === 'price-asc' ? aPrice - bPrice : bPrice - aPrice;
      });
    }

    if (limit) return result.slice(0, limit);
    return result;
  }, [query, category, sortBy, region, limit, products]);

  const handleViewDetails = useCallback((product: Product, planIndex = 0) => {
    setSelectedProduct(product);
    setSelectedPlanIndex(planIndex);
  }, []);

  return (
    <>
      <div className="py-6">
        {showHeading && (
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              All Digital Products
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
              Find the perfect subscription, license, or digital tool for your workflow.
            </p>
          </div>
        )}

        {showFilters && (
          <div className="mb-6 space-y-4">
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                id="product-search"
                type="text"
                placeholder="Search products, AI tools, licenses, subscriptions…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category filters + Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Category chips */}
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat.id}
                    id={`filter-${cat.id}`}
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200',
                      category === cat.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-blue-400 hover:text-blue-600 dark:hover:text-white'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  id="product-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none pl-3.5 pr-8 py-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id} className="dark:bg-[#0c1527] dark:text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        {showFilters && (
          <div className="mb-4 text-xs font-semibold text-slate-400">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-3">🔍</div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">No products found</h3>
              <p className="text-slate-400 text-xs mb-4">
                Try adjusting your search query or filter.
              </p>
              <button
                onClick={() => { setQuery(''); setCategory('all'); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold shadow-sm"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
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
