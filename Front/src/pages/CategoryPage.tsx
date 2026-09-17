import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import type { Category } from '@/types';
import ProductGrid from '@/components/products/ProductGrid';

const categories = categoriesData as Category[];

const categoryLabels: Record<string, string> = {
  ai: 'AI & Productivity',
  gaming: 'Gaming',
  developer: 'Developer Tools',
  education: 'Education',
  subscriptions: 'Subscriptions',
  wallet: 'PS Wallet',
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  if (!category && slug) {
    return (
      <div className="section-pad container-main text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Category not found</h1>
        <Link to="/" className="btn-primary inline-flex">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="section-pad">
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6">
            <ArrowLeft size={15} />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            {category?.name ?? categoryLabels[slug ?? ''] ?? 'Products'}
          </h1>
          {category?.description && (
            <p className="text-gray-500 text-lg">{category.description}</p>
          )}
        </div>

        <ProductGrid
          initialCategory={slug ?? 'all'}
          showFilters={true}
          showHeading={false}
        />
      </div>
    </div>
  );
}
