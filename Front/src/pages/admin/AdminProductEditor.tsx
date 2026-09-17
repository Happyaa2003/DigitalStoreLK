import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, CheckCircle, AlertCircle, Loader2, Plus, Trash2, Eye } from 'lucide-react';
import productsData from '@/data/products.json';
import type { Product, ProductPlan } from '@/types';
import { useAdminStore } from '@/stores/adminStore';
import { cn } from '@/utils/cn';

const products = productsData as Product[];

type PublishStatus = 'idle' | 'saving' | 'uploading' | 'publishing' | 'success' | 'error';

const emptyPlan: ProductPlan = {
  id: '',
  name: '',
  duration: '',
  price: { LK: '', GLOBAL: '' },
  normalPrice: { LK: '', GLOBAL: '' },
  discount: { enabled: false, label: '' },
  description: '',
  activation: '',
};

const emptyProduct: Product = {
  id: '',
  name: '',
  category: 'ai',
  shortDescription: '',
  description: '',
  plans: [{ ...emptyPlan, id: 'plan-1', name: 'Default' }],
  activation: '',
  features: [''],
  notes: [''],
  image: '/assets/products/placeholder.webp',
  badge: '',
  featured: false,
  available: true,
  order: 99,
};

export default function AdminProductEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const existing = !isNew ? products.find((p) => p.id === id) : null;
  const navigate = useNavigate();
  const { token } = useAdminStore();

  const [form, setForm] = useState<Product>(existing ? JSON.parse(JSON.stringify(existing)) : { ...emptyProduct });
  const [status, setStatus] = useState<PublishStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const updateField = (field: keyof Product, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updatePlan = (idx: number, field: keyof ProductPlan, value: unknown) => {
    setForm((prev) => {
      const plans = [...prev.plans];
      plans[idx] = { ...plans[idx], [field]: value };
      return { ...prev, plans };
    });
  };

  const addPlan = () => {
    setForm((prev) => ({
      ...prev,
      plans: [...prev.plans, { ...emptyPlan, id: `plan-${Date.now()}`, name: `Plan ${prev.plans.length + 1}` }],
    }));
  };

  const removePlan = (idx: number) => {
    if (form.plans.length <= 1) return;
    setForm((prev) => ({ ...prev, plans: prev.plans.filter((_, i) => i !== idx) }));
  };

  const handlePublish = async () => {
    setStatus('saving');
    setErrorMsg('');

    try {
      // Build the new products array
      let newProducts: Product[];
      if (isNew) {
        const slug = form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        newProducts = [...products, { ...form, id: `${slug}-${Date.now()}` }];
      } else {
        newProducts = products.map((p) => p.id === id ? form : p);
      }

      setStatus('uploading');

      const res = await fetch('/api/github-commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          path: 'Front/src/data/products.json',
          content: JSON.stringify(newProducts, null, 2),
          message: isNew
            ? `feat: add product ${form.name}`
            : `fix: update product ${form.name}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'GitHub commit failed');
      }

      setStatus('success');
      setTimeout(() => navigate('/admin/products'), 2000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Publish failed');
      setStatus('error');
    }
  };

  const statusMessages: Record<PublishStatus, string> = {
    idle: '',
    saving: 'Saving…',
    uploading: 'Uploading to GitHub…',
    publishing: 'Publishing…',
    success: 'Published successfully! ✓',
    error: errorMsg,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-7">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/products')}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {isNew ? 'Add Product' : `Edit: ${form.name}`}
            </h1>
            <p className="text-xs text-gray-400">Changes will be committed to GitHub and trigger a redeploy.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary !text-sm !py-2.5 !px-4"
          >
            <Eye size={14} />
            Preview
          </button>
          <button
            id="publish-btn"
            onClick={handlePublish}
            disabled={status === 'saving' || status === 'uploading' || status === 'publishing'}
            className="btn-primary !text-sm !py-2.5 !px-5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'saving' || status === 'uploading' || status === 'publishing' ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            Save &amp; Publish
          </button>
        </div>
      </div>

      {/* Status banner */}
      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'flex items-center gap-3 px-5 py-3.5 rounded-xl mb-6 text-sm font-medium',
            status === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
            status === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
            'bg-blue-50 border border-blue-200 text-blue-700'
          )}
        >
          {status === 'success' ? <CheckCircle size={16} /> :
           status === 'error' ? <AlertCircle size={16} /> :
           <Loader2 size={16} className="animate-spin" />}
          {statusMessages[status]}
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 pb-3 border-b border-gray-100">
              Basic Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name *</label>
                <input
                  id="field-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="e.g. Cursor Pro"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category *</label>
                <select
                  id="field-category"
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ai">AI & Productivity</option>
                  <option value="gaming">Gaming</option>
                  <option value="developer">Developer Tools</option>
                  <option value="education">Education</option>
                  <option value="subscriptions">Subscriptions</option>
                  <option value="wallet">PS Wallet</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Short Description *</label>
                <input
                  id="field-short-desc"
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => updateField('shortDescription', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Brief one-line description shown on cards"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Description</label>
                <textarea
                  id="field-description"
                  rows={3}
                  value={form.description ?? ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                  placeholder="Detailed description shown in product modal"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Badge</label>
                <select
                  id="field-badge"
                  value={form.badge ?? ''}
                  onChange={(e) => updateField('badge', e.target.value || undefined)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value="">None</option>
                  <option value="POPULAR">POPULAR</option>
                  <option value="HOT DEAL">HOT DEAL</option>
                  <option value="NEW">NEW</option>
                  <option value="BEST VALUE">BEST VALUE</option>
                  <option value="LIMITED">LIMITED</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Activation Method</label>
                <input
                  id="field-activation"
                  type="text"
                  value={form.activation ?? ''}
                  onChange={(e) => updateField('activation', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                  placeholder="e.g. Own Email Activation"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Image Path</label>
                <input
                  id="field-image"
                  type="text"
                  value={form.image}
                  onChange={(e) => updateField('image', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                  placeholder="/assets/products/product-name.webp"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Display Order</label>
                <input
                  id="field-order"
                  type="number"
                  value={form.order ?? 99}
                  onChange={(e) => updateField('order', parseInt(e.target.value) || 99)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            {/* Toggles */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  id="field-featured"
                  type="checkbox"
                  checked={form.featured ?? false}
                  onChange={(e) => updateField('featured', e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  id="field-available"
                  type="checkbox"
                  checked={form.available !== false}
                  onChange={(e) => updateField('available', e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">Available</span>
              </label>
            </div>
          </div>

          {/* Plans / Pricing */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Plans & Pricing</h2>
              <button onClick={addPlan} className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:text-blue-700">
                <Plus size={13} /> Add Plan
              </button>
            </div>
            <div className="space-y-6">
              {form.plans.map((plan, idx) => (
                <div key={plan.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
                  {form.plans.length > 1 && (
                    <button
                      onClick={() => removePlan(idx)}
                      className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Plan {idx + 1}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Plan Name</label>
                      <input
                        id={`plan-name-${idx}`}
                        type="text"
                        value={plan.name}
                        onChange={(e) => updatePlan(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        placeholder="e.g. Pro, 5X, Standard Edition"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Duration</label>
                      <input
                        id={`plan-duration-${idx}`}
                        type="text"
                        value={plan.duration ?? ''}
                        onChange={(e) => updatePlan(idx, 'duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        placeholder="e.g. 1 Month, 1 Year"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">🇱🇰 LK Price</label>
                      <input
                        id={`plan-price-lk-${idx}`}
                        type="text"
                        value={plan.price.LK ?? ''}
                        onChange={(e) => updatePlan(idx, 'price', { ...plan.price, LK: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        placeholder="LKR 3,800/="
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">🌍 Global Price</label>
                      <input
                        id={`plan-price-global-${idx}`}
                        type="text"
                        value={plan.price.GLOBAL ?? ''}
                        onChange={(e) => updatePlan(idx, 'price', { ...plan.price, GLOBAL: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        placeholder="$10"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Normal LK Price (for strikethrough)</label>
                      <input
                        id={`plan-normal-lk-${idx}`}
                        type="text"
                        value={plan.normalPrice?.LK ?? ''}
                        onChange={(e) => updatePlan(idx, 'normalPrice', { ...plan.normalPrice, LK: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        placeholder="LKR 7,600/="
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Normal Global Price</label>
                      <input
                        id={`plan-normal-global-${idx}`}
                        type="text"
                        value={plan.normalPrice?.GLOBAL ?? ''}
                        onChange={(e) => updatePlan(idx, 'normalPrice', { ...plan.normalPrice, GLOBAL: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        placeholder="$20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Discount Label</label>
                      <select
                        id={`plan-discount-label-${idx}`}
                        value={plan.discount?.label ?? ''}
                        onChange={(e) => updatePlan(idx, 'discount', {
                          enabled: !!e.target.value,
                          label: e.target.value,
                        })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                      >
                        <option value="">None</option>
                        <option value="50% OFF">50% OFF</option>
                        <option value="40% OFF">40% OFF</option>
                        <option value="30% OFF">30% OFF</option>
                        <option value="HOT DEAL">HOT DEAL</option>
                        <option value="BEST VALUE">BEST VALUE</option>
                        <option value="NEW">NEW</option>
                        <option value="Up to 40% OFF">Up to 40% OFF</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Plan Description</label>
                      <input
                        id={`plan-desc-${idx}`}
                        type="text"
                        value={plan.description ?? ''}
                        onChange={(e) => updatePlan(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        placeholder="e.g. Sharable with up to 5 members"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Features</h2>
              <button
                onClick={() => updateField('features', [...(form.features ?? []), ''])}
                className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold"
              >
                <Plus size={13} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {(form.features ?? []).map((feature, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    id={`feature-${i}`}
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const arr = [...(form.features ?? [])];
                      arr[i] = e.target.value;
                      updateField('features', arr);
                    }}
                    className="flex-1 px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                    placeholder="Feature description"
                  />
                  <button
                    onClick={() => updateField('features', (form.features ?? []).filter((_, j) => j !== i))}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Important Notes</h2>
              <button
                onClick={() => updateField('notes', [...(form.notes ?? []), ''])}
                className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold"
              >
                <Plus size={13} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {(form.notes ?? []).map((note, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    id={`note-${i}`}
                    type="text"
                    value={note}
                    onChange={(e) => {
                      const arr = [...(form.notes ?? [])];
                      arr[i] = e.target.value;
                      updateField('notes', arr);
                    }}
                    className="flex-1 px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                    placeholder="Important note for customers"
                  />
                  <button
                    onClick={() => updateField('notes', (form.notes ?? []).filter((_, j) => j !== i))}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar — mini preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Card Preview</h3>
            {/* Mini card preview */}
            <div className="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
              <div className="h-24 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <span className="text-3xl font-black text-blue-200">
                    {form.name.substring(0, 2).toUpperCase() || '??'}
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 capitalize">
                  {form.category}
                </div>
                <div className="text-sm font-bold text-gray-900 mb-1">{form.name || 'Product Name'}</div>
                <div className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {form.shortDescription || 'Short description here'}
                </div>
                <div className="text-sm font-black text-gray-900">
                  {form.plans[0]?.price?.LK || 'Price not set'}
                </div>
                {form.badge && (
                  <div className="mt-2 inline-block px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold">
                    {form.badge}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-1.5">
              <div>ID: <span className="text-gray-600 font-mono">{form.id || 'auto-generated'}</span></div>
              <div>Plans: <span className="text-gray-600">{form.plans.length}</span></div>
              <div>Featured: <span className="text-gray-600">{form.featured ? 'Yes' : 'No'}</span></div>
              <div>Available: <span className="text-gray-600">{form.available !== false ? 'Yes' : 'No'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
