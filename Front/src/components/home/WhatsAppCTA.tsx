import { ShieldCheck, Zap, Sparkles, ChevronRight } from 'lucide-react';
import { getWhatsAppChatLink, getTelegramChatLink } from '@/utils/whatsapp';
import { WhatsAppIcon, TelegramIcon } from '@/components/common/BrandIcons';

export default function WhatsAppCTA() {
  return (
    <section className="py-4 sm:py-6 px-3 sm:px-6">
      <div className="container-main">
        {/* Rounded Order Banner Card */}
        <div
          className="relative rounded-3xl overflow-hidden p-6 sm:p-8 text-white shadow-2xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, #021a52 0%, #053b9e 50%, #03256c 100%)',
          }}
        >
          {/* Subtle Glows */}
          <div className="absolute -top-16 left-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 right-10 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* 1. Left: 3D Phones Graphic + Order Now Text & CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
              {/* 3D Phone Badges Graphic */}
              <div className="relative w-28 h-20 flex-shrink-0 flex items-center justify-center">
                {/* Telegram Phone */}
                <div className="absolute right-0 top-1 w-14 h-18 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 p-1 shadow-lg shadow-blue-500/40 border border-white/20 transform rotate-12 flex items-center justify-center">
                  <TelegramIcon className="w-7 h-7 fill-white" />
                </div>
                {/* WhatsApp Phone */}
                <div className="absolute left-0 top-0 w-14 h-18 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-1 shadow-lg shadow-emerald-500/40 border border-white/20 transform -rotate-6 flex items-center justify-center z-10">
                  <WhatsAppIcon className="w-7 h-7 fill-white" />
                </div>
              </div>

              {/* Order Now Headlines & Buttons */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Order Now</h3>
                <p className="text-xs sm:text-sm text-sky-200 font-medium mb-3">Get your product in seconds!</p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <a
                    href={getWhatsAppChatLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02]"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>WhatsApp Order</span>
                    <ChevronRight size={14} />
                  </a>

                  <a
                    href={getTelegramChatLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/30 transition-all hover:scale-[1.02]"
                  >
                    <TelegramIcon className="w-4 h-4 fill-white" />
                    <span>Telegram Order</span>
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Middle: 3 Trust Highlights */}
            <div className="hidden md:flex items-center gap-6 border-y lg:border-y-0 lg:border-x border-white/10 py-3 lg:py-0 px-0 lg:px-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sky-300">
                  <ShieldCheck size={16} />
                </div>
                <div className="text-[11px] font-bold text-white leading-tight">
                  Secure<br />Transactions
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-yellow-300">
                  <Zap size={16} />
                </div>
                <div className="text-[11px] font-bold text-white leading-tight">
                  Fast &amp;<br />Reliable Delivery
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-300">
                  <Sparkles size={16} />
                </div>
                <div className="text-[11px] font-bold text-white leading-tight">
                  Best Prices<br />in Sri Lanka
                </div>
              </div>
            </div>

            {/* 3. Right: Handwritten Script "More Products Coming Soon!" */}
            <div className="text-center lg:text-right">
              <span className="font-serif italic text-lg sm:text-xl text-sky-200 tracking-wide drop-shadow">
                More Products<br />
                <span className="text-white font-extrabold">Coming Soon!</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
