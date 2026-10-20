import { Link } from 'react-router-dom';
import { getWhatsAppChatLink, getTelegramChatLink } from '@/utils/whatsapp';
import { WhatsAppColorIcon, TelegramIcon } from '@/components/common/BrandIcons';
import { getAssetUrl } from '@/utils/assets';

export default function WhatsAppCTA() {
  return (
    <section className="py-4 sm:py-6 px-3 sm:px-6">
      <div className="container-main">
        {/* Main Card with cyber ambient glow */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl p-2 sm:p-3.5 bg-gradient-to-b from-[#07132a] via-[#040a18] to-[#020612] border border-cyan-500/25 shadow-2xl shadow-blue-950/60 group">
          {/* Ambient Glows */}
          <div className="absolute inset-0 bg-radial from-blue-600/10 via-transparent to-transparent pointer-events-none rounded-2xl sm:rounded-3xl" />
          <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[300px] h-[120px] bg-cyan-500/15 blur-[90px] pointer-events-none rounded-full" />
          <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[300px] h-[120px] bg-blue-600/15 blur-[90px] pointer-events-none rounded-full" />

          {/* 1. Panoramic Banner Graphic Container */}
          <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#020718]">
            {/* High-Resolution Footer Artwork from Front/Products/logos/footer.png */}
            <img
              src={getAssetUrl('/assets/brand/footer.png')}
              alt="Order Now — Get your product in seconds! DigitalStoreLK"
              className="w-full h-auto block select-none object-cover"
              loading="lazy"
            />

            {/* Interactive Hotspots Overlaid on Graphic */}
            {/* Hotspot 1: WhatsApp Phone (Left) */}
            <a
              href={getWhatsAppChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order via WhatsApp"
              title="Order via WhatsApp"
              className="absolute left-[1.5%] top-[5%] w-[8.5%] h-[90%] rounded-xl z-20 group/wa focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              <span className="absolute inset-0 rounded-xl bg-emerald-400/0 group-hover/wa:bg-emerald-400/10 transition-colors" />
            </a>

            {/* Hotspot 2: Telegram Phone */}
            <a
              href={getTelegramChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order via Telegram"
              title="Order via Telegram"
              className="absolute left-[10%] top-[5%] w-[8.5%] h-[90%] rounded-xl z-20 group/tg focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
            >
              <span className="absolute inset-0 rounded-xl bg-sky-400/0 group-hover/tg:bg-sky-400/10 transition-colors" />
            </a>

            {/* Hotspot 3: Order Now Text Area */}
            <a
              href={getWhatsAppChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order Now via WhatsApp"
              title="Order Now via WhatsApp"
              className="absolute left-[19%] top-[10%] w-[28%] h-[80%] rounded-xl z-20 group/order focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              <span className="absolute inset-0 rounded-xl bg-blue-400/0 group-hover/order:bg-blue-400/5 transition-colors" />
            </a>

            {/* Hotspot 4: More Products Coming Soon */}
            <Link
              to="/products"
              aria-label="Browse all digital products"
              title="Browse all products"
              className="absolute right-[1.5%] top-[10%] w-[12%] h-[80%] rounded-xl z-20 group/more focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
            >
              <span className="absolute inset-0 rounded-xl bg-cyan-400/0 group-hover/more:bg-cyan-400/10 transition-colors" />
            </Link>
          </div>

          {/* 2. Interactive Action Bar Beneath Banner */}
          <div className="mt-2.5 sm:mt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 px-1 sm:px-2">
            {/* Live Status / Trust Indicator */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-semibold text-white">Instant Digital Delivery in Sri Lanka</span>
              <span className="text-slate-400 hidden md:inline">• 24/7 Fast Support via WhatsApp & Telegram</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <a
                href={getWhatsAppChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsAppColorIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">WhatsApp Order</span>
              </a>

              <a
                href={getTelegramChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <TelegramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white flex-shrink-0" />
                <span className="whitespace-nowrap">Telegram Order</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
