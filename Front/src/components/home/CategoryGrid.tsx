import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Gamepad2, Code2, GraduationCap, Star, Wallet } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import type { Category } from '@/types';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sparkles,
  Gamepad2,
  Code2,
  GraduationCap,
  Star,
  Wallet,
};

const categories = categoriesData as Category[];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CategoryGrid() {
  return (
    <section className="section-pad bg-gray-50">
      <div className="container-main">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3">Product Categories</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            From AI tools to gaming — everything you need in one digital store.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categories.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((cat) => {
            const IconComponent = iconMap[cat.icon] ?? Star;
            return (
              <motion.div key={cat.id} variants={cardVariants}>
                <Link
                  to={`/category/${cat.slug}`}
                  id={`category-card-${cat.id}`}
                  className="group relative flex flex-col p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
                  style={{
                    ['--cat-from' as string]: cat.accentFrom,
                    ['--cat-to' as string]: cat.accentTo,
                  }}
                >
                  {/* Gradient border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${cat.accentFrom}20, ${cat.accentTo}10)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-100 transition-all duration-300 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${cat.accentFrom}, ${cat.accentTo})`,
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(135deg, ${cat.accentFrom}, ${cat.accentTo})` }}
                  >
                    <IconComponent size={22} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">{cat.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{cat.description}</p>
                  </div>

                  {/* Footer */}
                  <div className="relative flex items-center justify-between mt-2">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${cat.accentFrom}15`,
                        color: cat.accentFrom,
                      }}
                    >
                      Browse →
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
