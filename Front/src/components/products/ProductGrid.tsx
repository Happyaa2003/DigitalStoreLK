import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown } from 'lucide-react';
import productsData from '@/data/products.json';
import type { Product } from '@/types';
import { getPrice, parsePriceNumeric } from '@/utils/pricing';
import { usePricingStore } from '@/stores/pricingStore';
import { cn } from '@/utils/cn';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const products = productsData as Product[];

const categoryFilters = [
  { id: 'all', label: 'All Products' },
  { id: 'ai', label: 'AI' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'developer', label: 'Developer' },
  { id: 'education', label: 'Education' },
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
  const { region } = usePricingStore();

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const q = query.toLowerCase().trim();
      const matchesQuery = !q || (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.plans.some((pl) => pl.name.toLowerCase().includes(q))
      );
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
  }, [query, category, sortBy, region, limit]);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <>
      <div>
        {showHeading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="section-label mb-3">Product Catalog</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Explore DigitalStoreLK
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Find the perfect digital product for your needs.
            </p>
          </motion.div>
        )}

        {showFilters && (
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                id="product-search"
                type="text"
                placeholder="Search AI tools, games, courses, subscriptions…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                      'px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200',
                      category === cat.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
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
                  className="appearance-none pl-4 pr-9 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-400 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        {showFilters && (
          <div className="mb-5 text-sm text-gray-400">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  region={region}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-4">
                Try adjusting your search or filter.
              </p>
              <button
                onClick={() => { setQuery(''); setCategory('all'); }}
                className="btn-secondary !text-sm"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        region={region}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
