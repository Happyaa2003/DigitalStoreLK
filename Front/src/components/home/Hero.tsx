import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, HeadphonesIcon, Sparkles, Gamepad2, Code2, GraduationCap } from 'lucide-react';
import { getWhatsAppChatLink, getTelegramChatLink } from '@/utils/whatsapp';

const floatingCards = [
  {
    id: 'ai',
    label: 'AI Tools',
    icon: Sparkles,
    gradient: 'from-indigo-500 to-cyan-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    delay: 0,
    position: 'top-[8%] right-[12%]',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: Gamepad2,
    gradient: 'from-purple-500 to-orange-500',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    delay: 0.8,
    position: 'top-[30%] right-[-2%]',
  },
  {
    id: 'coding',
    label: 'Dev Tools',
    icon: Code2,
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    delay: 1.6,
    position: 'bottom-[30%] right-[10%]',
  },
  {
    id: 'learning',
    label: 'Learning',
    icon: GraduationCap,
    gradient: 'from-sky-500 to-teal-500',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    delay: 2.4,
    position: 'bottom-[10%] right-[30%]',
  },
];

const trustItems = [
  { icon: Zap, label: 'Fast Response', color: 'text-yellow-500' },
  { icon: Shield, label: 'Easy Activation', color: 'text-green-500' },
  { icon: HeadphonesIcon, label: 'Customer Support', color: 'text-blue-500' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] flex items-center overflow-hidden bg-white"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/60 to-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-cyan-100/50 to-teal-100/30 blur-3xl pointer-events-none" />

      <motion.div style={{ y, opacity }} className="container-main w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
            >
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                🇱🇰 Sri Lanka's Digital Store
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6"
            >
              Premium{' '}
              <span className="text-gradient-blue">Digital</span>
              {' '}Products.
              <br />
              <span className="text-gray-500 font-bold text-3xl sm:text-4xl lg:text-5xl">
                Smarter Tools.
              </span>{' '}
              <span className="text-gradient-ai text-3xl sm:text-4xl lg:text-5xl font-bold">
                Better Value.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500 text-lg leading-relaxed max-w-lg mb-8"
            >
              AI, gaming, coding and learning products — carefully organised in one modern digital store. Fast delivery via WhatsApp.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link
                to="/products"
                id="hero-explore-cta"
                className="btn-primary group !px-6 !py-3.5 shadow-lg shadow-blue-600/20"
              >
                Explore Products
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={getWhatsAppChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-cta"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <img src="/assets/brand/whatsapp-color-icon.svg" alt="WhatsApp" className="w-5 h-5 object-contain" />
                <span>WhatsApp</span>
              </a>
              <a
                href={getTelegramChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-telegram-cta"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all active:scale-95"
              >
                <img src="/assets/brand/telegram-icon.svg" alt="Telegram" className="w-5 h-5 object-contain" />
                <span>Telegram</span>
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center ${item.color}`}>
                    <item.icon size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Brand Look up banner & visual cards */}
          <div className="relative h-[460px] lg:h-[520px] hidden md:flex items-center justify-center">
            {/* Ambient backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-cyan-500/10 rounded-3xl filter blur-3xl" />

            {/* Brand Lockup Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 w-full max-w-[440px] p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl flex flex-col items-center text-center"
            >
              {/* Brand Lockup banner from user Accerts */}
              <div className="w-full bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-white/10">
                <img
                  src="/assets/brand/digitalstorelk-brand-lockup.svg"
                  alt="DigitalStoreLK Brand Lockup"
                  className="w-full h-24 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/brand/LOGO.png';
                  }}
                />
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-100">
                <Sparkles size={13} className="text-blue-600 animate-pulse" />
                <span>Verified Reseller &amp; Fast Turnaround</span>
              </div>
              <p className="text-xs text-gray-500 max-w-xs mb-4">
                Smart Tools • Premium Access • Better You
              </p>

              {/* Direct channels banner */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 w-full justify-center">
                <a
                  href={getWhatsAppChatLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <img src="/assets/brand/whatsapp-color-icon.svg" alt="WhatsApp" className="w-4 h-4" />
                  +94 72 151 0654
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href={getTelegramChatLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <img src="/assets/brand/telegram-icon.svg" alt="Telegram" className="w-4 h-4" />
                  @DigitalStoreLK
                </a>
              </div>
            </motion.div>

            {/* Floating category badges */}
            {floatingCards.slice(0, 3).map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + card.delay * 0.1 }}
                className={`absolute ${card.position} animate-float z-20`}
                style={{ animationDelay: `${card.delay * 0.4}s` }}
              >
                <div className="flex items-center gap-3 px-4 py-2.5 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-default">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                    <card.icon size={15} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">{card.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Feature badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-4 left-4 z-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-2xl shadow-lg text-xs font-bold"
            >
              🇱🇰 LKR 330 = $1 FX Rate
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
