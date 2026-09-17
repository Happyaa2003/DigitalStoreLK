import { motion } from 'framer-motion';
import { MousePointer2, MessageSquare, CreditCard, PackageCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MousePointer2,
    title: 'Choose Product',
    description: 'Browse our catalog and select the digital product or subscription that fits your needs.',
    color: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-200',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Send Order',
    description: 'Click "Order Now" and send a quick WhatsApp message with your product of choice.',
    color: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-200',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Complete Payment',
    description: 'Pay via Bank Transfer or Binance — fast, simple, and secure.',
    color: 'from-purple-500 to-violet-600',
    glow: 'shadow-purple-200',
  },
  {
    number: '04',
    icon: PackageCheck,
    title: 'Receive Access',
    description: 'Get your redeem key, account credentials, or subscription activation — delivered promptly.',
    color: 'from-orange-500 to-amber-500',
    glow: 'shadow-orange-200',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-gray-50">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="section-label mb-3">Simple Process</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Ordering a digital product from DigitalStoreLK takes just minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector lines — desktop only */}
          <div className="absolute top-[52px] left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-px bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 hidden lg:block pointer-events-none" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl ${step.glow} mb-5 z-10`}>
                <step.icon size={26} className="text-white" />
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-lg bg-white border-2 border-gray-100 flex items-center justify-center">
                  <span className="text-[10px] font-black text-gray-400">{step.number}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
