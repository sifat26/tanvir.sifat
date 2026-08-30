import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';

const PLATFORMS = ['github', 'linkedin', 'twitter', 'facebook', 'instagram'];

const SocialsEditor = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['socials'], queryFn: () => adminApi.get('/socials').then(r => r.data.data) });
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setForm(data); }, [data]);

  const mutation = useMutation({
    mutationFn: (payload) => adminApi.put('/socials', payload),
    onSuccess: () => { qc.invalidateQueries(['socials']); setSaved(true); setTimeout(() => setSaved(false), 2500); },
  });

  if (isLoading) return <div className="text-[var(--text-muted)]">Loading…</div>;

  return (
    <AdminPageWrapper title="Social Links" subtitle="Links shown in the footer and contact section">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }} className="card p-6 space-y-4 max-w-xl">
        {PLATFORMS.map((p) => (
          <div key={p}>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5 capitalize">{p}</label>
            <input value={form[p] || ''} onChange={(e) => setForm({ ...form, [p]: e.target.value })} className="input w-full" placeholder={`https://${p}.com/...`} />
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={mutation.isPending} className="btn btn-primary disabled:opacity-60">{mutation.isPending ? 'Saving…' : 'Save Changes'}</button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </form>
    </AdminPageWrapper>
  );
};

export default SocialsEditor;
