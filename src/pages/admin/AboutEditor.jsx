import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';

const AboutEditor = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['about'], queryFn: () => adminApi.get('/about').then(r => r.data.data) });
  const [form, setForm] = useState({ headline: '', short: ['', ''], paragraphs: ['', '', '', ''] });
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setForm({ headline: data.headline || '', short: data.short || ['', ''], paragraphs: data.paragraphs || [''] }); }, [data]);

  const mutation = useMutation({
    mutationFn: (payload) => adminApi.put('/about', payload),
    onSuccess: () => { qc.invalidateQueries(['about']); setSaved(true); setTimeout(() => setSaved(false), 2500); },
  });

  const handleSubmit = (e) => { e.preventDefault(); mutation.mutate({ ...form, short: form.short.filter(Boolean), paragraphs: form.paragraphs.filter(Boolean) }); };

  const updateArray = (field, idx, value) => {
    const arr = [...(form[field] || [])];
    arr[idx] = value;
    setForm({ ...form, [field]: arr });
  };

  const addItem = (field) => setForm({ ...form, [field]: [...(form[field] || []), ''] });
  const removeItem = (field, idx) => setForm({ ...form, [field]: form[field].filter((_, i) => i !== idx) });

  if (isLoading) return <div className="text-[var(--text-muted)]">Loading…</div>;

  return (
    <AdminPageWrapper title="About Section" subtitle="Bio headline, short summary, and full paragraphs">
      <form onSubmit={handleSubmit} className="card p-6 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Headline</label>
          <input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} className="input w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">Short Bio (2 sentences shown by default)</label>
          {(form.short || []).map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <textarea value={item} onChange={(e) => updateArray('short', idx, e.target.value)} rows={2} className="input w-full resize-y text-sm" />
              <button type="button" onClick={() => removeItem('short', idx)} className="shrink-0 text-red-500 hover:text-red-700 text-xs mt-1">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('short')} className="text-sm text-[var(--accent)] hover:underline">+ Add sentence</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">Full Paragraphs (shown after "Read more")</label>
          {(form.paragraphs || []).map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <textarea value={item} onChange={(e) => updateArray('paragraphs', idx, e.target.value)} rows={3} className="input w-full resize-y text-sm" />
              <button type="button" onClick={() => removeItem('paragraphs', idx)} className="shrink-0 text-red-500 hover:text-red-700 text-xs mt-1">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('paragraphs')} className="text-sm text-[var(--accent)] hover:underline">+ Add paragraph</button>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={mutation.isPending} className="btn btn-primary disabled:opacity-60">{mutation.isPending ? 'Saving…' : 'Save Changes'}</button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </form>
    </AdminPageWrapper>
  );
};

export default AboutEditor;
