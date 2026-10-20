import { Link } from 'react-router-dom';
import { Globe, Heart } from 'lucide-react';
import storeConfig from '@/config/storeConfig.json';
import { getAssetUrl } from '@/utils/assets';
import { WhatsAppColorIcon } from '@/components/common/BrandIcons';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050c18] text-slate-700 dark:text-slate-300 transition-colors">
      {/* High-Resolution Order Banner with footer.png */}
      <WhatsAppCTA />

      <div className="container-main py-6 sm:py-8 border-t border-slate-200/50 dark:border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 1. Left: Brand Lockup */}
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="DigitalStoreLK Home">
              <img
                src={getAssetUrl(storeConfig.logo)}
                alt={storeConfig.shopName}
                className="h-9 w-9 object-contain rounded-xl"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </Link>
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                DigitalStore<span className="text-blue-600 dark:text-blue-400">LK</span>
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                Your Digital Needs, Our Priority
              </div>
            </div>
          </div>

          {/* 2. Middle: Contact / Trust channels */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href={storeConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <WhatsAppColorIcon className="w-3.5 h-3.5" />
              </div>
              <span>{storeConfig.whatsappNumber}</span>
            </a>

            <a
              href="https://digitalstorelk.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Globe size={12} />
              </div>
              <span>digitalstorelk.netlify.app</span>
            </a>

            <a
              href={storeConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-[10px]">
                f
              </div>
              <span>Facebook</span>
            </a>
          </div>

          {/* 3. Right: Quick category links or Tagline */}
          <div className="text-right text-xs text-slate-400 font-serif italic">
            Your Digital Partner in Sri Lanka <Heart size={12} className="inline text-blue-400 fill-blue-400 ml-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
