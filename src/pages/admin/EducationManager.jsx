import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const EMPTY = { degree: '', institute: '', period: '', status: 'Completed', notes: [] };

const EducationForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial || EMPTY);
  const set = (k, v) => setForm({ ...form, [k]: v });
  const setNote = (idx, v) => { const a = [...form.notes]; a[idx] = v; set('notes', a); };

  return (
    <div className="card p-5 space-y-4 mb-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {[['degree', 'Degree *'], ['institute', 'Institute *'], ['period', 'Period']].map(([name, label]) => (
          <div key={name}>
            <label className="block text-xs font-medium text-[var(--text)] mb-1">{label}</label>
            <input value={form[name] || ''} onChange={(e) => set(name, e.target.value)} className="input w-full text-sm" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-[var(--text)] mb-1">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className="input w-full text-sm">
            {['Completed', 'In progress', 'Dropped'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--text)] mb-1">Notes</label>
        {(form.notes || []).map((n, i) => (
          <div key={i} className="flex gap-2 mb-1.5">
            <input value={n} onChange={(e) => setNote(i, e.target.value)} className="input w-full text-sm" />
            <button type="button" onClick={() => set('notes', form.notes.filter((_, j) => j !== i))} className="text-red-500"><X className="w-4 h-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => set('notes', [...(form.notes || []), ''])} className="text-xs text-[var(--accent)] hover:underline">+ Add note</button>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} disabled={loading} className="btn btn-primary text-sm disabled:opacity-60">{loading ? 'Saving…' : 'Save'}</button>
        <button onClick={onCancel} className="btn btn-secondary text-sm">Cancel</button>
      </div>
    </div>
  );
};

const EducationManager = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['education-admin'], queryFn: () => adminApi.get('/education').then(r => r.data.data) });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const create = useMutation({ mutationFn: (d) => adminApi.post('/education', d), onSuccess: () => { qc.invalidateQueries(['education-admin']); setShowForm(false); } });
  const update = useMutation({ mutationFn: ({ id, ...d }) => adminApi.patch(`/education/${id}`, d), onSuccess: () => { qc.invalidateQueries(['education-admin']); setEditing(null); } });
  const remove = useMutation({ mutationFn: (id) => adminApi.delete(`/education/${id}`), onSuccess: () => qc.invalidateQueries(['education-admin']) });

  if (isLoading) return <div className="text-[var(--text-muted)]">Loading…</div>;

  return (
    <AdminPageWrapper title="Education" subtitle="Degrees, institutes, and notes" action={
      <button onClick={() => setShowForm(true)} className="btn btn-primary text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add</button>
    }>
      {showForm && <EducationForm onSave={(d) => create.mutate(d)} onCancel={() => setShowForm(false)} loading={create.isPending} />}
      <div className="space-y-3">
        {(data || []).map((edu) => editing?._id === edu._id ? (
          <EducationForm key={edu._id} initial={editing} onSave={(d) => update.mutate({ id: edu._id, ...d })} onCancel={() => setEditing(null)} loading={update.isPending} />
        ) : (
          <div key={edu._id} className="card p-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-sm text-[var(--text)]">{edu.degree}</p>
              <p className="text-xs text-[var(--text-muted)]">{edu.institute} · {edu.period} · {edu.status}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(edu)} className="p-1.5 rounded hover:bg-[var(--bg-subtle)]"><Pencil className="w-4 h-4 text-[var(--text-muted)]" /></button>
              <button onClick={() => remove.mutate(edu._id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminPageWrapper>
  );
};

export default EducationManager;
