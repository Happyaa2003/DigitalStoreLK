import { motion } from 'framer-motion';
import { Package, CheckCircle, Star, LayoutGrid, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import categoriesData from '@/data/categories.json';
import type { Category } from '@/types';
import { useProductStore } from '@/stores/productStore';

const categories = categoriesData as Category[];

export default function AdminDashboard() {
  const { products } = useProductStore();

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'from-blue-500 to-indigo-600',
      to: '/admin/products',
    },
    {
      label: 'Active Products',
      value: products.filter((p) => p.available !== false).length,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600',
      to: '/admin/products',
    },
    {
      label: 'Featured Products',
      value: products.filter((p) => p.featured).length,
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      to: '/admin/products',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: LayoutGrid,
      color: 'from-purple-500 to-violet-600',
      to: '/admin/settings',
    },
  ];
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back! Here's an overview of your store.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={stat.to}
              className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/products/new" className="btn-primary !text-sm !py-2.5 !px-5">
            <Package size={15} />
            Add Product
          </Link>
          <Link to="/admin/settings" className="btn-secondary !text-sm !py-2.5 !px-5">
            Store Settings
          </Link>
          <Link to="/admin/branding" className="btn-secondary !text-sm !py-2.5 !px-5">
            Branding
          </Link>
          <Link to="/admin/payments" className="btn-secondary !text-sm !py-2.5 !px-5">
            Payment Settings
          </Link>
        </div>
      </div>

      {/* Recent products table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Products</h2>
          <Link to="/admin/products" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All <ArrowRight size={13} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plans</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.slice(0, 6).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-900">{product.name}</td>
                  <td className="px-5 py-3.5 text-gray-500 capitalize">{product.category}</td>
                  <td className="px-5 py-3.5 text-gray-500">{product.plans.length}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      product.available !== false
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {product.available !== false ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {product.featured && (
                      <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-semibold">
                        <Star size={11} /> Featured
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
