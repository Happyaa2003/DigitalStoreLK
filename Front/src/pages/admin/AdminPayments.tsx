import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import storeConfigData from '@/config/storeConfig.json';
import type { StoreConfig } from '@/types';

type Status = 'idle' | 'saving' | 'success' | 'error';

export default function AdminPayments() {
  const { token } = useAdminStore();
  const [config, setConfig] = useState<StoreConfig>(storeConfigData as StoreConfig);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const updateBank = (field: string, value: string | boolean) => {
    setConfig((prev) => ({
      ...prev,
      payments: {
        ...prev.payments,
        bankTransfer: { ...prev.payments.bankTransfer, [field]: value },
      },
    }));
  };

  const updateBinance = (field: string, value: string | boolean) => {
    setConfig((prev) => ({
      ...prev,
      payments: {
        ...prev.payments,
        binance: { ...prev.payments.binance, [field]: value },
      },
    }));
  };

  const handleSave = async () => {
    setStatus('saving');
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          path: 'Front/src/config/storeConfig.json',
          content: JSON.stringify(config, null, 2),
          message: 'fix: update payment settings',
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Save failed');
      setStatus('error');
    }
  };

  const bankConfig = config.payments.bankTransfer;
  const binanceConfig = config.payments.binance;

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Payment Settings</h1>
          <p className="text-sm text-gray-500">Configure your accepted payment methods.</p>
        </div>
        <button
          id="payments-save-btn"
          onClick={handleSave}
          disabled={status === 'saving'}
          className="btn-primary !text-sm !py-2.5 disabled:opacity-60"
        >
          {status === 'saving' ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Save &amp; Publish
        </button>
      </div>

      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 px-5 py-3.5 rounded-xl mb-6 text-sm font-medium ${
            status === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
            status === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
            'bg-blue-50 border border-blue-200 text-blue-700'
          }`}
        >
          {status === 'success' ? <CheckCircle size={16} /> :
           status === 'error' ? <AlertCircle size={16} /> :
           <Loader2 size={16} className="animate-spin" />}
          {status === 'success' ? 'Payment settings saved!' :
           status === 'error' ? errorMsg : 'Saving…'}
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {/* Bank Transfer */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">🏦 Bank Transfer</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                id="bank-enabled"
                type="checkbox"
                checked={bankConfig.enabled}
                onChange={(e) => updateBank('enabled', e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-xs font-semibold text-gray-600">Enabled</span>
            </label>
          </div>
          <div className="space-y-3">
            {[
              { id: 'bank-name', label: 'Bank Name', field: 'bankName', placeholder: 'e.g. Commercial Bank' },
              { id: 'bank-accName', label: 'Account Name', field: 'accountName', placeholder: 'Full account name' },
              { id: 'bank-accNum', label: 'Account Number', field: 'accountNumber', placeholder: 'e.g. 8123456789' },
              { id: 'bank-branch', label: 'Branch', field: 'branch', placeholder: 'e.g. Colombo 03' },
            ].map(({ id, label, field, placeholder }) => (
              <div key={field}>
                <label htmlFor={id} className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
                <input
                  id={id}
                  type="text"
                  value={(bankConfig[field as keyof typeof bankConfig] as string) ?? ''}
                  onChange={(e) => updateBank(field, e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                  placeholder={placeholder}
                />
              </div>
            ))}
            <div>
              <label htmlFor="bank-instructions" className="block text-xs font-semibold text-gray-500 mb-1">Instructions</label>
              <textarea
                id="bank-instructions"
                rows={3}
                value={bankConfig.instructions ?? ''}
                onChange={(e) => updateBank('instructions', e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 resize-none"
                placeholder="Instructions shown to customers after selecting Bank Transfer"
              />
            </div>
          </div>
        </div>

        {/* Binance */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">₿ Binance</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                id="binance-enabled"
                type="checkbox"
                checked={binanceConfig.enabled}
                onChange={(e) => updateBinance('enabled', e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-xs font-semibold text-gray-600">Enabled</span>
            </label>
          </div>
          <div className="space-y-3">
            <div>
              <label htmlFor="binance-wallet" className="block text-xs font-semibold text-gray-500 mb-1">Wallet Address / Binance Pay ID</label>
              <input
                id="binance-wallet"
                type="text"
                value={binanceConfig.walletAddress ?? ''}
                onChange={(e) => updateBinance('walletAddress', e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 font-mono"
                placeholder="Your Binance wallet address"
              />
            </div>
            <div>
              <label htmlFor="binance-network" className="block text-xs font-semibold text-gray-500 mb-1">Network</label>
              <input
                id="binance-network"
                type="text"
                value={binanceConfig.network ?? ''}
                onChange={(e) => updateBinance('network', e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                placeholder="e.g. BNB Smart Chain (BEP20)"
              />
            </div>
            <div>
              <label htmlFor="binance-instructions" className="block text-xs font-semibold text-gray-500 mb-1">Instructions</label>
              <textarea
                id="binance-instructions"
                rows={3}
                value={binanceConfig.instructions ?? ''}
                onChange={(e) => updateBinance('instructions', e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 resize-none"
                placeholder="Instructions shown to customers after selecting Binance"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700">
        <strong>Security Note:</strong> Payment details entered here are stored in your public GitHub repository in storeConfig.json. 
        Only enter details you're comfortable making public, or consider using the payment section as instructions-only and sharing actual 
        details via WhatsApp after order confirmation.
      </div>
    </div>
  );
}
