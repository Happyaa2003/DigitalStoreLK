import { getWhatsAppChatLink, getTelegramChatLink } from '@/utils/whatsapp';
import { WhatsAppIcon, TelegramIcon } from '@/components/common/BrandIcons';
import { getAssetUrl } from '@/utils/assets';

export default function WhatsAppCTA() {
  return (
    <section className="py-4 sm:py-6 px-3 sm:px-6">
      <div className="container-main">
        {/* Rounded Footer Banner Container with footer.jpg */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#030611] group">
          {/* Background Ambient Glows */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-blue-900/10 pointer-events-none" />
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[350px] h-[150px] bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

          {/* High-Resolution Footer Artwork from Front/Products/logos/footer.jpg */}
          <img
            src={getAssetUrl('/assets/brand/footer.jpg')}
            alt="Order Now — Get your product in seconds! DigitalStoreLK"
            className="w-full h-auto block select-none pointer-events-none object-cover"
            loading="lazy"
          />

          {/* Action Buttons overlaid on top of the image in the exact button space holder */}
          <div className="absolute left-[20%] sm:left-[21%] md:left-[22%] bottom-[8%] sm:bottom-[11%] md:bottom-[13%] lg:bottom-[15%] flex flex-wrap items-center gap-1.5 sm:gap-2.5 md:gap-3 z-20">
            {/* Button 1: WhatsApp Order */}
            <a
              href={getWhatsAppChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl bg-[#128C7E] hover:bg-[#0e7064] text-white font-bold text-[9px] sm:text-xs md:text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-white flex-shrink-0" />
              <span className="whitespace-nowrap">WhatsApp Order</span>
            </a>

            {/* Button 2: Telegram Order */}
            <a
              href={getTelegramChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-[9px] sm:text-xs md:text-sm shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <TelegramIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-white flex-shrink-0" />
              <span className="whitespace-nowrap">Telegram Order</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
