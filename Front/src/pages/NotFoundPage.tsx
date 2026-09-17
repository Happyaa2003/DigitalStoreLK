import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <div className="text-[120px] font-black text-gray-100 leading-none select-none mb-4">
          404
        </div>
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
          Looks like you took a wrong turn.
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist. Head back to the store to browse our products.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" id="not-found-back-home" className="btn-primary group">
            <Home size={17} />
            Back to Store
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/products" className="btn-secondary">
            Browse All Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
