import { motion } from 'framer-motion';
import { Zap, ShoppingBag, LayoutGrid, HeadphonesIcon, Tag, KeyRound } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Fast Response',
    description: 'We respond to WhatsApp orders quickly and aim to deliver digital products promptly after payment.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: ShoppingBag,
    title: 'Easy Ordering',
    description: 'Simply tap the Order button — a pre-filled WhatsApp message opens instantly, no complicated forms.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: LayoutGrid,
    title: 'Wide Selection',
    description: 'AI tools, gaming, developer tools, learning platforms and PS wallet — all in one place.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: HeadphonesIcon,
    title: 'Customer Support',
    description: 'Our team is available via WhatsApp to help with product selection, activation and any questions.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Tag,
    title: 'Flexible Pricing',
    description: 'LKR prices for Sri Lankan customers, USD for international — and regular deals on popular products.',
    color: 'from-cyan-500 to-sky-600',
  },
  {
    icon: KeyRound,
    title: 'Convenient Activation',
    description: 'Multiple activation options — own email, ready-made accounts, or redeem codes — to suit your preference.',
    color: 'from-rose-500 to-pink-600',
  },
];

export default function TrustSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3">Why Choose Us</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Why DigitalStoreLK?
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            We're a digital-first store built for convenience, value and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{reason.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
