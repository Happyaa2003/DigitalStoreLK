import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Copy, CheckCheck } from 'lucide-react';
import storeConfig from '@/config/storeConfig.json';

function PaymentModal({ type, onClose }: { type: 'bank' | 'binance'; onClose: () => void }) {
  const [copied, setCopied] = useState('');
  const config = type === 'bank' ? storeConfig.payments.bankTransfer : storeConfig.payments.binance;
  const isBank = type === 'bank';

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  const bankConfig = storeConfig.payments.bankTransfer;
  const binanceConfig = storeConfig.payments.binance;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className={`p-6 ${isBank ? 'bg-gradient-to-br from-blue-600 to-indigo-700' : 'bg-gradient-to-br from-yellow-500 to-orange-600'}`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 p-2 flex items-center justify-center">
                <img
                  src={isBank ? '/assets/payments/bank-building-icon.svg' : '/assets/payments/binance-logo-icon.svg'}
                  alt={isBank ? 'Bank' : 'Binance'}
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isBank ? 'Bank Transfer' : 'Binance Payment'}
              </h2>
            </div>
            <p className="text-white/70 text-sm">
              {isBank ? 'Local bank transfer payment details' : 'Cryptocurrency payment details'}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {isBank ? (
              <>
                {[
                  { label: 'Bank Name', value: bankConfig.bankName, key: 'bank' },
                  { label: 'Account Name', value: bankConfig.accountName, key: 'name' },
                  { label: 'Account Number', value: bankConfig.accountNumber, key: 'number' },
                  { label: 'Branch', value: bankConfig.branch, key: 'branch' },
                ].map((field) => field.value && (
                  <div key={field.key} className="flex items-start justify-between gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <div className="text-xs text-gray-400 font-medium mb-0.5">{field.label}</div>
                      <div className="text-sm font-semibold text-gray-800">{field.value}</div>
                    </div>
                    <button
                      onClick={() => copyText(field.value!, field.key)}
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={`Copy ${field.label}`}
                    >
                      {copied === field.key ? <CheckCheck size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                {binanceConfig.walletAddress && (
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-400 font-medium mb-1">Wallet Address / Binance Pay ID</div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-semibold text-gray-800 break-all">{binanceConfig.walletAddress}</div>
                      <button
                        onClick={() => copyText(binanceConfig.walletAddress!, 'wallet')}
                        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Copy wallet address"
                      >
                        {copied === 'wallet' ? <CheckCheck size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}
                {binanceConfig.network && (
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-400 font-medium mb-0.5">Network</div>
                    <div className="text-sm font-semibold text-gray-800">{binanceConfig.network}</div>
                  </div>
                )}
              </>
            )}

            {/* Instructions */}
            {config.instructions && (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1.5">Instructions</div>
                <p className="text-sm text-amber-700 leading-relaxed">{config.instructions}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PaymentSection() {
  const [activeModal, setActiveModal] = useState<'bank' | 'binance' | null>(null);

  const bankEnabled = storeConfig.payments.bankTransfer.enabled;
  const binanceEnabled = storeConfig.payments.binance.enabled;

  return (
    <>
      <section className="section-pad bg-gray-50">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="section-label mb-3">Payments</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Easy Payment Options
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Choose from local bank transfer or Binance — both are fast and secure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Bank Transfer */}
            {bankEnabled && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-7 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3.5 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/assets/payments/bank-building-icon.svg"
                    alt="Bank Transfer"
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Bank Transfer</h3>
                <p className="text-sm text-gray-500 mb-5">
                  Direct bank transfer to our local Sri Lankan bank account. Simple and reliable.
                </p>
                <button
                  id="view-bank-details"
                  onClick={() => setActiveModal('bank')}
                  className="btn-secondary w-full justify-center group"
                >
                  <Eye size={15} />
                  View Payment Details
                </button>
              </motion.div>
            )}

            {/* Binance */}
            {binanceEnabled && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-7 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F3BA2F] p-3 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/assets/payments/binance-logo-icon.svg"
                    alt="Binance"
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Binance Pay</h3>
                <p className="text-sm text-gray-500 mb-5">
                  Pay with cryptocurrency via Binance Pay ID or direct BEP20 wallet transfer.
                </p>
                <button
                  id="view-binance-details"
                  onClick={() => setActiveModal('binance')}
                  className="btn-secondary w-full justify-center group"
                >
                  <Eye size={15} />
                  View Payment Details
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {activeModal && (
        <PaymentModal type={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
