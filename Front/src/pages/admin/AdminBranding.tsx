import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, CheckCircle, AlertCircle, Upload, Image } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import storeConfigData from '@/config/storeConfig.json';
import type { StoreConfig } from '@/types';

type Status = 'idle' | 'saving' | 'success' | 'error';

export default function AdminBranding() {
  const { token } = useAdminStore();
  const [config, setConfig] = useState<StoreConfig>(storeConfigData as StoreConfig);
  const [logoPreview, setLogoPreview] = useState<string>(config.logo);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PNG, JPG, JPEG, WEBP or SVG files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', 'Front/public/assets/brand/digitalstorelk-logo.png');

      const res = await fetch('/api/upload-media', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json() as { url: string };
      setLogoPreview(url);
      setConfig((prev) => ({ ...prev, logo: url }));
    } catch (err) {
      alert('Logo upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
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
          message: 'fix: update branding settings',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setErrorMsg('Save failed');
      setStatus('error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Branding</h1>
          <p className="text-sm text-gray-500">Manage your store's logo and visual identity.</p>
        </div>
        <button
          id="branding-save-btn"
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
          {status === 'success' ? 'Branding saved!' : status === 'error' ? errorMsg : 'Saving…'}
        </motion.div>
      )}

      <div className="space-y-5">
        {/* Logo management */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 pb-3 border-b border-gray-100">
            Store Logo
          </h2>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Preview */}
            <div className="flex-shrink-0 w-40 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="max-w-full max-h-full object-contain p-2"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <Image size={28} className="text-gray-300" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-3">
                Upload your logo file. Accepted: PNG, JPG, WEBP, SVG. Max size: 5MB.
              </p>
              <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mb-3">
                The logo will be saved as <code className="font-mono">/assets/brand/digitalstorelk-logo.png</code>
              </p>

              <label
                htmlFor="logo-upload"
                className={`inline-flex items-center gap-2 btn-secondary !text-sm cursor-pointer ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
              >
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                {uploading ? 'Uploading…' : 'Choose Logo File'}
              </label>
              <input
                id="logo-upload"
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.svg"
                onChange={handleLogoUpload}
                className="hidden"
              />

              <div className="mt-3">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Logo Path (manual)</label>
                <input
                  id="logo-path"
                  type="text"
                  value={config.logo}
                  onChange={(e) => { setConfig((prev) => ({ ...prev, logo: e.target.value })); setLogoPreview(e.target.value); }}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 font-mono"
                  placeholder="/assets/brand/digitalstorelk-logo.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo usage note */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-700">
          <strong>Logo Guidelines:</strong>
          <ul className="mt-2 space-y-1 text-xs list-disc list-inside">
            <li>Do not crop or distort the logo</li>
            <li>Keep original aspect ratio — the app preserves it automatically</li>
            <li>Logo appears in: Desktop header, Mobile header, Footer, Admin panel</li>
            <li>Upload a PNG with transparent background for best results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
