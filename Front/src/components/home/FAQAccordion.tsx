import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import storeConfig from '@/config/storeConfig.json';
import { cn } from '@/utils/cn';

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const faqs = storeConfig.faq;

  return (
    <section className="section-pad bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3">Support</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Everything you need to know about ordering from DigitalStoreLK.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                'rounded-2xl border transition-all duration-200',
                openId === faq.id
                  ? 'border-blue-200 bg-blue-50/50 shadow-sm'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              )}
            >
              <button
                id={`faq-${faq.id}`}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className={cn(
                  'text-sm font-semibold leading-snug transition-colors',
                  openId === faq.id ? 'text-blue-700' : 'text-gray-900'
                )}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
                    openId === faq.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                  )}
                >
                  <ChevronDown size={15} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
