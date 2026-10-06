import { Link } from 'react-router-dom';
import { ExternalLink, ChevronRight } from 'lucide-react';
import storeConfig from '@/config/storeConfig.json';
import { getWhatsAppChatLink, getTelegramChatLink } from '@/utils/whatsapp';
import { getAssetUrl } from '@/utils/assets';
import { WhatsAppIcon, WhatsAppColorIcon, TelegramIcon } from '@/components/common/BrandIcons';

const footerCategories = [
  { label: 'AI & Productivity', to: '/category/ai' },
  { label: 'Gaming', to: '/category/gaming' },
  { label: 'Developer Tools', to: '/category/developer' },
  { label: 'Education', to: '/category/education' },
  { label: 'Subscriptions', to: '/category/subscriptions' },
  { label: 'PS Wallet', to: '/category/wallet' },
];

const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'All Products', to: '/products' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="container-main">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" aria-label="DigitalStoreLK Home" className="flex items-center gap-3 mb-4">
              <img
                src={getAssetUrl(storeConfig.logo)}
                alt={storeConfig.shopName}
                className="h-10 w-10 object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-extrabold text-white">
                DigitalStore<span className="text-blue-400">LK</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {storeConfig.tagline}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 transition-all duration-200"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppColorIcon className="w-5 h-5 flex-shrink-0" />
              </a>
              <a
                href={getTelegramChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/30 text-gray-400 hover:text-sky-400 transition-all duration-200"
                aria-label="Telegram"
                title="Chat on Telegram"
              >
                <TelegramIcon className="w-5 h-5 flex-shrink-0" />
              </a>
              {storeConfig.facebookUrl && (
                <a
                  href={storeConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 text-gray-400 hover:text-blue-400 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2.5">
              {footerNav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5">
              {footerCategories.map((cat) => (
                <li key={cat.to}>
                  <Link
                    to={cat.to}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Get in Touch</h3>
            <p className="text-gray-400 text-sm mb-4">
              Have questions about a product? Chat with us on WhatsApp for fast support.
            </p>
            <div className="space-y-2 mb-3">
              <a
                href={getWhatsAppChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp-cta"
                className="btn-whatsapp !text-xs !py-2.5 !px-3 w-full justify-center"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white flex-shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={getTelegramChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-telegram-cta"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-sm shadow-sky-500/20"
              >
                <TelegramIcon className="w-4 h-4 flex-shrink-0" />
                <span>Chat on Telegram</span>
              </a>
            </div>
            <p className="text-gray-500 text-[11px] text-center">
              WA: {storeConfig.whatsappNumber} • TG: @{storeConfig.telegramUsername}
            </p>

            {/* Payment badges with official icons */}
            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">Accepted Payments</div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs">
                  <img src={getAssetUrl('/assets/payments/bank-building-icon.svg')} alt="Bank" className="w-4 h-4 object-contain filter brightness-0 invert" />
                  <span>Bank Transfer</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs">
                  <img src={getAssetUrl('/assets/payments/binance-logo-icon.svg')} alt="Binance" className="w-4 h-4 object-contain filter brightness-0 invert" />
                  <span>Binance Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            {storeConfig.footer.copyright}
          </p>
          <p className="text-gray-600 text-xs max-w-xl leading-relaxed">
            {storeConfig.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
