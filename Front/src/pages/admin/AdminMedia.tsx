import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, FileImage, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';

interface UploadedFile {
  name: string;
  url: string;
  size: string;
  uploaded: boolean;
}

export default function AdminMedia() {
  const { token } = useAdminStore();
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const uploadFile = async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(`File "${file.name}" is not an allowed type.`);
      return;
    }
    if (file.size > MAX_SIZE) {
      setError(`File "${file.name}" exceeds 5MB limit.`);
      return;
    }

    const targetPath = `Front/public/assets/products/${file.name.toLowerCase().replace(/\s+/g, '-')}`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', targetPath);

    setUploading(true);
    try {
      const res = await fetch('/api/upload-media', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const { url: uploadedUrl } = await res.json() as { url: string };

      const publicPath = `/assets/products/${file.name.toLowerCase().replace(/\s+/g, '-')}`;
      setUploads((prev) => [...prev, {
        name: file.name,
        url: publicPath,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploaded: true,
      }]);
      void uploadedUrl; // url returned from API (publicPath is derived from filename)
      setError('');
    } catch {
      setError(`Failed to upload "${file.name}". Please check your connection and try again.`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(uploadFile);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(uploadFile);
  }, [token]);

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Media Manager</h1>
        <p className="text-sm text-gray-500">Upload product images and other media assets.</p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 mb-6 ${
          dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 size={32} className="text-blue-500 animate-spin" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Upload size={28} className="text-blue-500" />
            </div>
          )}
          <div>
            <p className="text-base font-semibold text-gray-800">
              {uploading ? 'Uploading to GitHub…' : 'Drop files here or click to upload'}
            </p>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG, JPEG, WEBP, SVG — Max 5MB per file</p>
          </div>
          {!uploading && (
            <label
              htmlFor="media-upload"
              className="btn-primary !text-sm !py-2.5 !px-5 cursor-pointer"
            >
              <FileImage size={15} />
              Choose Files
            </label>
          )}
          <input
            id="media-upload"
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.webp,.svg"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-5 py-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-4"
        >
          <AlertCircle size={15} />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
            <X size={14} />
          </button>
        </motion.div>
      )}

      {/* Uploaded files */}
      {uploads.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-700">Recently Uploaded</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {uploads.map((file, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Image size={18} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{file.name}</div>
                  <div className="text-xs text-gray-400">{file.size}</div>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-lg font-mono">
                    {file.url}
                  </code>
                  {file.uploaded && (
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 p-4 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-500 space-y-1">
        <p><strong>Where are files stored?</strong> Images are uploaded to <code className="font-mono bg-white px-1 rounded">Front/public/assets/products/</code> in your GitHub repository.</p>
        <p><strong>How to use in products?</strong> After uploading, set the product's image field to <code className="font-mono bg-white px-1 rounded">/assets/products/your-file-name.webp</code></p>
      </div>
    </div>
  );
}
