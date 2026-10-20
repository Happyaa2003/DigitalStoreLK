import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Gamepad2, 
  GraduationCap, 
  ShieldCheck, 
  Code2, 
  Tv, 
  LayoutGrid, 
  Layers,
  Palette
} from 'lucide-react';

const categories = [
  { id: 'ai', slug: 'ai', name: 'AI & Productivity', icon: Sparkles, color: 'text-indigo-500' },
  { id: 'microsoft', slug: 'developer', name: 'Microsoft', icon: Layers, color: 'text-blue-500' },
  { id: 'design', slug: 'subscriptions', name: 'Design & Creative', icon: Palette, color: 'text-pink-500' },
  { id: 'gaming', slug: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'text-purple-500' },
  { id: 'education', slug: 'education', name: 'Learning & Courses', icon: GraduationCap, color: 'text-sky-500' },
  { id: 'security', slug: 'wallet', name: 'Security & VPN', icon: ShieldCheck, color: 'text-emerald-500' },
  { id: 'tools', slug: 'developer', name: 'Software & Tools', icon: Code2, color: 'text-blue-600' },
  { id: 'entertainment', slug: 'subscriptions', name: 'Entertainment', icon: Tv, color: 'text-rose-500' },
  { id: 'others', slug: 'products', name: 'Others', icon: LayoutGrid, color: 'text-slate-400' },
];

export default function CategoryGrid() {
  return (
    <section className="py-2.5">
      <div className="container-main">
        {/* Horizontal Category Pill Bar */}
        <div className="overflow-x-auto scrollbar-hide -mx-3 px-3 py-1">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const href = cat.slug === 'products' ? '/products' : `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  to={href}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/50 shadow-sm transition-all duration-200 group"
                >
                  <Icon size={16} className={`${cat.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
