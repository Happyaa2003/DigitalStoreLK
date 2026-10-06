import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X, Send } from 'lucide-react';
import storeConfig from '@/config/storeConfig.json';
import { usePricingStore } from '@/stores/pricingStore';
import { getWhatsAppChatLink, getTelegramChatLink } from '@/utils/whatsapp';
import { cn } from '@/utils/cn';
import { getAssetUrl } from '@/utils/assets';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'AI Tools', to: '/category/ai' },
  { label: 'Gaming', to: '/category/gaming' },
  { label: 'Developer', to: '/category/developer' },
  { label: 'Education', to: '/category/education' },
  { label: 'Subscriptions', to: '/category/subscriptions' },
  { label: 'PS Wallet', to: '/category/wallet' },
  { label: 'Deals', to: '/products' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { region, setRegion } = usePricingStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
            : 'bg-white/80 backdrop-blur-sm'
        )}
        style={{ height: scrolled ? 'var(--header-height-scrolled)' : 'var(--header-height)' }}
      >
        <div className="container-main h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5" aria-label="DigitalStoreLK Home">
            <img
              src={getAssetUrl(storeConfig.logo)}
              alt={storeConfig.shopName}
              className={cn(
                'object-contain rounded-xl transition-all duration-300 shadow-sm border border-gray-100/50',
                scrolled ? 'h-9 w-9' : 'h-11 w-11'
              )}
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = 'none';
                const sibling = t.nextElementSibling as HTMLElement | null;
                if (sibling) sibling.style.display = 'flex';
              }}
            />
            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg leading-tight tracking-tight text-gray-900">
                DigitalStore<span className="text-blue-600">LK</span>
              </span>
              <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase hidden sm:inline">
                Smart Tools • Premium
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pricing Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
              <button
                id="pricing-lk"
                onClick={() => setRegion('LK')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
                  region === 'LK'
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                )}
                aria-pressed={region === 'LK'}
              >
                🇱🇰 <span className="hidden md:inline">Sri Lanka</span>
              </button>
              <button
                id="pricing-global"
                onClick={() => setRegion('GLOBAL')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
                  region === 'GLOBAL'
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                )}
                aria-pressed={region === 'GLOBAL'}
              >
                🌍 <span className="hidden md:inline">Global</span>
              </button>
            </div>

            {/* Telegram CTA */}
            <a
              href={getTelegramChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              id="header-telegram-cta"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-sm shadow-sky-500/20 active:scale-95"
              title="Chat on Telegram"
            >
              <Send size={14} />
              <span>Telegram</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-cta"
              className="hidden sm:flex items-center gap-2 btn-whatsapp !py-2 !px-4 !text-sm"
            >
              <MessageCircle size={16} />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src={getAssetUrl(storeConfig.logo)}
                    alt={storeConfig.shopName}
                    className="h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Pricing switcher mobile */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                <span className="text-xs text-gray-500 font-medium">Pricing:</span>
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setRegion('LK')}
                    className={cn(
                      'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                      region === 'LK' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                    )}
                  >
                    🇱🇰 Sri Lanka
                  </button>
                  <button
                    onClick={() => setRegion('GLOBAL')}
                    className={cn(
                      'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                      region === 'GLOBAL' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                    )}
                  >
                    🌍 Global
                  </button>
                </div>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Contact CTAs */}
              <div className="p-4 border-t border-gray-100 space-y-2">
                <a
                  href={getWhatsAppChatLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center !py-3"
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
                <a
                  href={getTelegramChatLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-md shadow-sky-500/20 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <Send size={16} />
                  Chat on Telegram
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to push content below fixed header */}
      <div style={{ height: 'var(--header-height)' }} />
    </>
  );
}
