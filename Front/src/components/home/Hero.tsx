import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
  ShoppingCart,
  Brain,
  Palette,
  Gamepad2,
  GraduationCap,
  ShieldCheck,
  Settings,
  Play,
  LayoutGrid,
} from 'lucide-react';
import { getWhatsAppChatLink } from '@/utils/whatsapp';
import { getAssetUrl } from '@/utils/assets';

// 9 Category tabs matching the screenshot bottom bar
const categoryTabs = [
  { id: 'ai', slug: 'ai', name: 'AI & Productivity', icon: Brain, color: 'text-indigo-400' },
  { id: 'microsoft', slug: 'developer', name: 'Microsoft', icon: LayoutGrid, color: 'text-sky-400' },
  { id: 'design', slug: 'subscriptions', name: 'Design & Creative', icon: Palette, color: 'text-pink-400' },
  { id: 'gaming', slug: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'text-purple-400' },
  { id: 'education', slug: 'education', name: 'Learning & Courses', icon: GraduationCap, color: 'text-cyan-400' },
  { id: 'security', slug: 'wallet', name: 'Security & VPN', icon: ShieldCheck, color: 'text-emerald-400' },
  { id: 'tools', slug: 'developer', name: 'Software & Tools', icon: Settings, color: 'text-blue-400' },
  { id: 'entertainment', slug: 'subscriptions', name: 'Entertainment', icon: Play, color: 'text-green-400' },
  { id: 'others', slug: 'products', name: 'Others', icon: LayoutGrid, color: 'text-slate-400' },
];

export default function Hero() {
  return (
    <section className="py-3 sm:py-5 px-3 sm:px-6">
      <div className="container-main">
        {/* 1. Hero Image Container with Placed Interactive Buttons */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#020718]">
          {/* High-res hero artwork from Front/Products/logos/hero.jpg */}
          <img
            src={getAssetUrl('/assets/brand/hero.jpg')}
            alt="Premium Digital Products for a Smarter You — DigitalStoreLK"
            className="w-full h-auto block select-none pointer-events-none object-cover"
            loading="eager"
          />

          {/* Action Buttons overlaid on top of the image in the exact space below the 3 value bullets */}
          <div className="absolute left-[5.4%] bottom-[10%] sm:bottom-[13%] md:bottom-[15%] lg:bottom-[17%] flex items-center gap-1.5 sm:gap-3 md:gap-4 z-20">
            {/* Primary CTA: Browse Products */}
            <a
              href="#trending-products"
              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-500 hover:from-blue-500 hover:to-sky-400 text-white font-black text-[9px] sm:text-xs md:text-sm tracking-wide shadow-lg shadow-blue-500/40 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <ShoppingCart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Browse Products</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
            </a>

            {/* Secondary CTA: Contact Us (WhatsApp) */}
            <a
              href={getWhatsAppChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full bg-slate-900/70 hover:bg-slate-900/90 border border-white/25 hover:border-white/50 text-white font-bold text-[9px] sm:text-xs md:text-sm tracking-wide transition-all backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-400 flex-shrink-0" />
              <span className="whitespace-nowrap">Contact Us</span>
            </a>
          </div>
        </div>

        {/* 2. Bottom 9-Category Navigation Bar */}
        <div className="mt-3 sm:mt-4">
          <div className="rounded-2xl bg-[#061226]/90 border border-white/10 p-2 sm:p-2.5 shadow-xl backdrop-blur-md">
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1 sm:gap-1.5">
              {categoryTabs.map((cat) => {
                const Icon = cat.icon;
                const href = cat.slug === 'products' ? '/products' : `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.id}
                    to={href}
                    className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl transition-all duration-200 hover:bg-blue-600/15 border border-transparent hover:border-blue-500/30 group text-center"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={18} className={cat.color} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 group-hover:text-white mt-1.5 whitespace-nowrap">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
