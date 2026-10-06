import { motion } from 'framer-motion';
import { getWhatsAppChatLink, getTelegramChatLink } from '@/utils/whatsapp';
import storeConfig from '@/config/storeConfig.json';
import { WhatsAppColorIcon, TelegramIcon } from '@/components/common/BrandIcons';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-[999] flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
      {/* Telegram Floating Button */}
      <motion.a
        href={getTelegramChatLink()}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-telegram"
        aria-label="Chat on Telegram"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: 'spring', damping: 15, stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-sky-500 text-white shadow-xl shadow-sky-500/20 hover:bg-sky-600 transition-all font-bold text-xs"
        title={`Chat on Telegram — @${storeConfig.telegramUsername}`}
      >
        <TelegramIcon className="w-5 h-5 flex-shrink-0" />
        <span className="hidden sm:inline">Telegram</span>
      </motion.a>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={getWhatsAppChatLink()}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', damping: 15, stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all font-bold text-xs"
        title={`Chat on WhatsApp — ${storeConfig.whatsappNumber}`}
      >
        <WhatsAppColorIcon className="w-6 h-6 flex-shrink-0" />
        <span className="hidden sm:inline">WhatsApp</span>
        {/* Pulse ping ring */}
        <span className="absolute inset-0 rounded-2xl bg-emerald-400 animate-ping opacity-25 pointer-events-none" />
      </motion.a>
    </div>
  );
}
