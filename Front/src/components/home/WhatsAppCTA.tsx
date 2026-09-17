import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppChatLink } from '@/utils/whatsapp';
import storeConfig from '@/config/storeConfig.json';

export default function WhatsAppCTA() {
  return (
    <section className="section-pad-sm bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="container-main relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg mb-6 mx-auto">
            <MessageCircle size={28} className="text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Order?
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto mb-8">
            Chat with us on WhatsApp for fast, friendly service. We'll guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={getWhatsAppChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp"
              className="btn-whatsapp !px-8 !py-4 !text-base group"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/products"
              className="btn-secondary !border-white/20 !text-white hover:!bg-white/10 hover:!border-white/30 !px-8 !py-4 !text-base"
            >
              Browse All Products
            </a>
          </div>
          <p className="text-white/30 text-sm mt-6">{storeConfig.whatsappNumber}</p>
        </motion.div>
      </div>
    </section>
  );
}
