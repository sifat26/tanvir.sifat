import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const EMPTY = { role: '', company: '', shortName: '', location: '', period: '', type: 'Full-time', summary: '', highlights: [], tech: [] };

const ExperienceForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial || EMPTY);
  const set = (k, v) => setForm({ ...form, [k]: v });
  const setArr = (k, idx, v) => { const a = [...(form[k] || [])]; a[idx] = v; set(k, a); };
  const addArr = (k) => set(k, [...(form[k] || []), '']);
  const removeArr = (k, idx) => set(k, form[k].filter((_, i) => i !== idx));

  return (
    <div className="card p-5 space-y-4 mb-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {[['role', 'Role *'], ['company', 'Company *'], ['shortName', 'Short Name'], ['location', 'Location'], ['period', 'Period *']].map(([name, label]) => (
          <div key={name}>
            <label className="block text-xs font-medium text-[var(--text)] mb-1">{label}</label>
            <input value={form[name] || ''} onChange={(e) => set(name, e.target.value)} className="input w-full text-sm" required={label.includes('*')} />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-[var(--text)] mb-1">Type</label>
          <select value={form.type} onChange={(e) => set('type', e.target.value)} className="input w-full text-sm">
            {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--text)] mb-1">Summary</label>
        <textarea value={form.summary || ''} onChange={(e) => set('summary', e.target.value)} rows={2} className="input w-full resize-y text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--text)] mb-1">Highlights</label>
        {(form.highlights || []).map((h, i) => (
          <div key={i} className="flex gap-2 mb-1.5">
            <input value={h} onChange={(e) => setArr('highlights', i, e.target.value)} className="input w-full text-sm" />
            <button type="button" onClick={() => removeArr('highlights', i)} className="text-red-500"><X className="w-4 h-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => addArr('highlights')} className="text-xs text-[var(--accent)] hover:underline">+ Add highlight</button>
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--text)] mb-1">Tech (comma-separated)</label>
        <input value={(form.tech || []).join(', ')} onChange={(e) => set('tech', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className="input w-full text-sm" placeholder="React, Node.js, ..." />
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={() => onSave(form)} disabled={loading} className="btn btn-primary text-sm disabled:opacity-60">{loading ? 'Saving…' : 'Save'}</button>
        <button onClick={onCancel} className="btn btn-secondary text-sm">Cancel</button>
      </div>
    </div>
  );
};

const ExperienceManager = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['experiences-admin'], queryFn: () => adminApi.get('/experiences').then(r => r.data.data) });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const create = useMutation({ mutationFn: (d) => adminApi.post('/experiences', d), onSuccess: () => { qc.invalidateQueries(['experiences-admin']); setShowForm(false); } });
  const update = useMutation({ mutationFn: ({ id, ...d }) => adminApi.patch(`/experiences/${id}`, d), onSuccess: () => { qc.invalidateQueries(['experiences-admin']); setEditing(null); } });
  const remove = useMutation({ mutationFn: (id) => adminApi.delete(`/experiences/${id}`), onSuccess: () => qc.invalidateQueries(['experiences-admin']) });

  if (isLoading) return <div className="text-[var(--text-muted)]">Loading…</div>;

  return (
    <AdminPageWrapper title="Experience" subtitle="Work history and job roles" action={
      <button onClick={() => setShowForm(true)} className="btn btn-primary text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add</button>
    }>
      {showForm && <ExperienceForm onSave={(d) => create.mutate(d)} onCancel={() => setShowForm(false)} loading={create.isPending} />}
      <div className="space-y-3">
        {(data || []).map((exp) => editing?._id === exp._id ? (
          <ExperienceForm key={exp._id} initial={editing} onSave={(d) => update.mutate({ id: exp._id, ...d })} onCancel={() => setEditing(null)} loading={update.isPending} />
        ) : (
          <div key={exp._id} className="card p-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-sm text-[var(--text)]">{exp.role} — {exp.company}</p>
              <p className="text-xs text-[var(--text-muted)]">{exp.period} · {exp.type}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(exp)} className="p-1.5 rounded hover:bg-[var(--bg-subtle)]"><Pencil className="w-4 h-4 text-[var(--text-muted)]" /></button>
              <button onClick={() => remove.mutate(exp._id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminPageWrapper>
  );
};

export default ExperienceManager;
