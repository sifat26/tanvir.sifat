import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { adminApi } from '../../lib/api';

const ImageUploader = ({ folder = 'general', onUploaded, currentUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || '');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await adminApi.post(`/upload?folder=${folder}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      const url = res.data.data.url;
      setPreview(url);
      onUploaded(url);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {preview && (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-[var(--border)]" />
          <button type="button" onClick={() => { setPreview(''); onUploaded(''); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <div
        className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--accent)] transition-colors"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
      >
        {uploading ? (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]"><div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /> Uploading…</div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Upload className="w-4 h-4" /> <span>Click or drag to upload image (max 5MB)</span>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;
