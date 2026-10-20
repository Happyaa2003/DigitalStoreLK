import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Grid3X3, 
  LayoutGrid, 
  User, 
  Mail, 
  Search, 
  ShoppingCart, 
  ChevronDown, 
  Menu, 
  X 
} from 'lucide-react';
import storeConfig from '@/config/storeConfig.json';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/utils/cn';
import { getAssetUrl } from '@/utils/assets';

const categoryDropdown = [
  { label: 'AI & Productivity', to: '/category/ai' },
  { label: 'Microsoft', to: '/category/developer' },
  { label: 'Design & Creative', to: '/category/subscriptions' },
  { label: 'Gaming', to: '/category/gaming' },
  { label: 'Learning & Courses', to: '/category/education' },
  { label: 'Security & VPN', to: '/category/wallet' },
  { label: 'Software & Tools', to: '/category/developer' },
  { label: 'Entertainment', to: '/category/subscriptions' },
  { label: 'Others', to: '/products' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalCount, openCart } = useCartStore();
  const navigate = useNavigate();

  const cartCount = totalCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-40 transition-all duration-200',
          'bg-white/95 dark:bg-[#070e1c]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10',
          scrolled ? 'shadow-md' : ''
        )}
      >
        <div className={cn("container-main flex items-center justify-between gap-3 sm:gap-6 transition-all", scrolled ? "py-2.5" : "py-3.5")}>
          {/* 1. Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="DigitalStoreLK">
            <img
              src={getAssetUrl(storeConfig.logo)}
              alt={storeConfig.shopName}
              className="h-9 w-9 object-contain rounded-xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-[17px] leading-tight tracking-tight text-slate-900 dark:text-white flex items-center">
                DigitalStore<span className="text-blue-600 dark:text-blue-400">LK</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                Your Digital Needs, Our Priority
              </span>
            </div>
          </Link>

          {/* 2. Middle Navigation (Desktop) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1.5">
            {/* Home (Active Blue Pill) */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                )
              }
            >
              <Home size={14} />
              Home
            </NavLink>

            {/* All Products */}
            <NavLink
              to="/products"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                )
              }
            >
              <LayoutGrid size={14} />
              All Products
            </NavLink>

            {/* Categories Dropdown */}
            <div className="relative" onMouseLeave={() => setCatOpen(false)}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                onMouseEnter={() => setCatOpen(true)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                  catOpen
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/5'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                )}
              >
                <Grid3X3 size={14} />
                Categories
                <ChevronDown size={13} className={cn('transition-transform duration-200', catOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl shadow-black/15 p-1.5 z-50"
                  >
                    {categoryDropdown.map((cat) => (
                      <Link
                        key={cat.label}
                        to={cat.to}
                        onClick={() => setCatOpen(false)}
                        className="flex items-center px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-600/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                )
              }
            >
              <User size={14} />
              About
            </NavLink>

            {/* Contact */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                )
              }
            >
              <Mail size={14} />
              Contact
            </NavLink>
          </nav>

          {/* 3. Right Controls: Search, Cart, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Pill Input */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 lg:w-56 pl-8 pr-3.5 py-1.5 rounded-full text-xs bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              />
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </form>

            {/* Cart Button with Count Badge */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="View shopping cart"
            >
              <ShoppingCart size={19} />
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </button>



            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              aria-label="Open mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#070e1c] px-4 py-4 space-y-3"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </form>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-blue-400 text-xs font-bold"
                >
                  <Home size={16} /> Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-bold"
                >
                  <LayoutGrid size={16} /> All Products
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-bold"
                >
                  <User size={16} /> About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-bold"
                >
                  <Mail size={16} /> Contact
                </Link>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {categoryDropdown.map((c) => (
                    <Link
                      key={c.label}
                      to={c.to}
                      onClick={() => setMobileOpen(false)}
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 py-1"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
