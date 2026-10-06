import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Star, Eye, EyeOff } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/utils/cn';
import { getAssetUrl } from '@/utils/assets';
import { useProductStore } from '@/stores/productStore';

export default function AdminProducts() {
  const { products: storeProducts } = useProductStore();
  const [products, setProducts] = useState<Product[]>(storeProducts);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setProducts(storeProducts);
  }, [storeProducts]);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.category === filter;
    return matchSearch && matchFilter;
  });

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Products</h1>
          <p className="text-sm text-gray-500">{products.length} products in catalog</p>
        </div>
        <Link to="/admin/products/new" id="add-product-btn" className="btn-primary !text-sm !py-2.5">
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              id="admin-product-search"
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-semibold border capitalize transition-all',
                  filter === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                )}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plans</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                        <img
                          src={getAssetUrl(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                        {product.badge && (
                          <div className="text-[10px] text-gray-400">{product.badge}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 capitalize text-sm">{product.category}</td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{product.plans.length}</td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold',
                      product.available !== false
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-600'
                    )}>
                      {product.available !== false ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {product.featured && (
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        id={`edit-${product.id}`}
                        className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        id={`toggle-${product.id}`}
                        className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
                        title={product.available !== false ? 'Hide' : 'Show'}
                        onClick={() => {
                          setProducts(prev => prev.map(p =>
                            p.id === product.id ? { ...p, available: !(p.available !== false) } : p
                          ));
                        }}
                      >
                        {product.available !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-gray-400 text-sm">
              No products match your search.
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Note: Changes made here are local previews. Use "Save &amp; Publish" in the product editor to commit to GitHub.
      </p>
    </div>
  );
}
