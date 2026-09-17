import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import storeConfigData from '@/config/storeConfig.json';
import type { StoreConfig } from '@/types';

type PublishStatus = 'idle' | 'saving' | 'success' | 'error';

export default function AdminSettings() {
  const { token } = useAdminStore();
  const [config, setConfig] = useState<StoreConfig>(storeConfigData as StoreConfig);
  const [status, setStatus] = useState<PublishStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const updateField = (field: keyof StoreConfig, value: unknown) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setStatus('saving');
    setErrorMsg('');
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
          message: 'fix: update store settings',
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

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Store Settings</h1>
          <p className="text-sm text-gray-500">General store information and configuration.</p>
        </div>
        <button
          id="settings-save-btn"
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
          {status === 'success' ? 'Settings saved and published!' :
           status === 'error' ? errorMsg :
           'Saving…'}
        </motion.div>
      )}

      <div className="space-y-5">
        {/* Store identity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 pb-3 border-b border-gray-100">
            Store Identity
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { id: 'set-shopName', label: 'Shop Name', field: 'shopName' as keyof StoreConfig, type: 'text', placeholder: 'DigitalStoreLK' },
              { id: 'set-tagline', label: 'Tagline', field: 'tagline' as keyof StoreConfig, type: 'text', placeholder: 'Smart Tools. Premium Access. Better You.' },
              { id: 'set-whatsapp', label: 'WhatsApp Number', field: 'whatsappNumber' as keyof StoreConfig, type: 'text', placeholder: '+94 72 151 0654' },
              { id: 'set-whatsappUrl', label: 'WhatsApp URL', field: 'whatsappUrl' as keyof StoreConfig, type: 'text', placeholder: 'https://wa.me/94721510654' },
              { id: 'set-facebook', label: 'Facebook URL', field: 'facebookUrl' as keyof StoreConfig, type: 'text', placeholder: 'https://www.facebook.com/DigitalStoreLK' },
              { id: 'set-logo', label: 'Logo Path', field: 'logo' as keyof StoreConfig, type: 'text', placeholder: '/assets/brand/digitalstorelk-logo.png' },
            ].map(({ id, label, field, type, placeholder }) => (
              <div key={field}>
                <label htmlFor={id} className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                <input
                  id={id}
                  type={type}
                  value={(config[field] as string) ?? ''}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 pb-3 border-b border-gray-100">
            SEO Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="seo-title" className="block text-xs font-semibold text-gray-600 mb-1.5">Page Title</label>
              <input
                id="seo-title"
                type="text"
                value={config.seo.title}
                onChange={(e) => updateField('seo', { ...config.seo, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label htmlFor="seo-desc" className="block text-xs font-semibold text-gray-600 mb-1.5">Meta Description</label>
              <textarea
                id="seo-desc"
                rows={2}
                value={config.seo.description}
                onChange={(e) => updateField('seo', { ...config.seo, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Announcement bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 pb-3 border-b border-gray-100">
            Announcement Bar
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                id="ann-enabled"
                type="checkbox"
                checked={config.announcementBar.enabled}
                onChange={(e) => updateField('announcementBar', { ...config.announcementBar, enabled: e.target.checked })}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">Enable Announcement Bar</span>
            </label>
            <div>
              <label htmlFor="ann-text" className="block text-xs font-semibold text-gray-600 mb-1.5">Announcement Text</label>
              <textarea
                id="ann-text"
                rows={2}
                value={config.announcementBar.text}
                onChange={(e) => updateField('announcementBar', { ...config.announcementBar, text: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 pb-3 border-b border-gray-100">
            Footer
          </h2>
          <div className="space-y-3">
            <div>
              <label htmlFor="footer-disclaimer" className="block text-xs font-semibold text-gray-600 mb-1.5">Disclaimer Text</label>
              <textarea
                id="footer-disclaimer"
                rows={3}
                value={config.footer.disclaimer ?? ''}
                onChange={(e) => updateField('footer', { ...config.footer, disclaimer: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
            <div>
              <label htmlFor="footer-copyright" className="block text-xs font-semibold text-gray-600 mb-1.5">Copyright</label>
              <input
                id="footer-copyright"
                type="text"
                value={config.footer.copyright}
                onChange={(e) => updateField('footer', { ...config.footer, copyright: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
