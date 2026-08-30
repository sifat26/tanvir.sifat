import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';
import ImageUploader from './ImageUploader';

const FIELDS = [
  { name: 'name', label: 'Full Name' }, { name: 'shortName', label: 'Short Name' },
  { name: 'role', label: 'Role / Title' }, { name: 'headline', label: 'Headline' },
  { name: 'location', label: 'Location' }, { name: 'email', label: 'Email' },
  { name: 'phone', label: 'Phone' }, { name: 'whatsapp', label: 'WhatsApp URL' },
  { name: 'availability', label: 'Availability' }, { name: 'resumeUrl', label: 'Resume PDF URL' },
  { name: 'resumeUpdated', label: 'Resume Updated Date' }, { name: 'portrait', label: 'Portrait URL' },
];

const PersonalEditor = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['personal'], queryFn: () => adminApi.get('/personal').then(r => r.data.data) });
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setForm(data); }, [data]);

  const mutation = useMutation({
    mutationFn: (payload) => adminApi.put('/personal', payload),
    onSuccess: () => { qc.invalidateQueries(['personal']); setSaved(true); setTimeout(() => setSaved(false), 2500); },
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); mutation.mutate(form); };

  const handleImageUploaded = (url) => setForm((prev) => ({ ...prev, portrait: url }));

  if (isLoading) return <div className="text-[var(--text-muted)]">Loading…</div>;

  return (
    <AdminPageWrapper title="Personal Info" subtitle="Your name, contact details, and bio headline">
      <form onSubmit={handleSubmit} className="card p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Intro / Bio</label>
          <textarea name="intro" value={form.intro || ''} onChange={handleChange} rows={4} className="input w-full resize-y" />
        </div>
        {FIELDS.map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">{label}</label>
            <input name={name} value={form[name] || ''} onChange={handleChange} className="input w-full" />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">Upload Portrait</label>
          <ImageUploader folder="portraits" onUploaded={handleImageUploaded} currentUrl={form.portrait} />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={mutation.isPending} className="btn btn-primary disabled:opacity-60">
            {mutation.isPending ? 'Saving…' : 'Save Changes'}
          </button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
          {mutation.isError && <span className="text-sm text-red-500">Save failed.</span>}
        </div>
      </form>
    </AdminPageWrapper>
  );
};

export default PersonalEditor;
