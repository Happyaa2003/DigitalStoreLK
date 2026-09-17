import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink } from 'lucide-react';
import storeConfig from '@/config/storeConfig.json';
import { getWhatsAppChatLink } from '@/utils/whatsapp';

export default function ContactPage() {
  return (
    <div className="section-pad">
      <div className="container-main max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3">Contact</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-500 text-lg">
            The fastest way to reach us is via WhatsApp. We're happy to help with product selection, ordering and support.
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.a
            href={getWhatsAppChatLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="contact-whatsapp"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-green-200 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <MessageCircle size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">WhatsApp</div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {storeConfig.whatsappNumber}
              </div>
              <div className="text-sm text-gray-500">Tap to open WhatsApp →</div>
            </div>
          </motion.a>

          {storeConfig.facebookUrl && (
            <motion.a
              href={storeConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-facebook"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <ExternalLink size={24} />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Facebook</div>
                <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  DigitalStoreLK
                </div>
                <div className="text-sm text-gray-500">Visit our Facebook page →</div>
              </div>
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
}
