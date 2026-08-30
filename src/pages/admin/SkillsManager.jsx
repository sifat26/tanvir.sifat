import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';
import { Pencil, Trash2, Plus } from 'lucide-react';

const EMPTY = { group: '', items: [] };

const SkillForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial || EMPTY);
  return (
    <div className="card p-5 space-y-4 mb-4">
      <div>
        <label className="block text-xs font-medium text-[var(--text)] mb-1">Group Name *</label>
        <input value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} className="input w-full text-sm" placeholder="Frontend, Backend, AI/ML..." />
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--text)] mb-1">Skills (comma-separated)</label>
        <input value={(form.items || []).join(', ')} onChange={(e) => setForm({ ...form, items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="input w-full text-sm" placeholder="React, TypeScript, ..." />
      </div>
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} disabled={loading} className="btn btn-primary text-sm disabled:opacity-60">{loading ? 'Saving…' : 'Save'}</button>
        <button onClick={onCancel} className="btn btn-secondary text-sm">Cancel</button>
      </div>
    </div>
  );
};

const SkillsManager = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['skills-admin'], queryFn: () => adminApi.get('/skills').then(r => r.data.data) });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const create = useMutation({ mutationFn: (d) => adminApi.post('/skills', d), onSuccess: () => { qc.invalidateQueries(['skills-admin']); setShowForm(false); } });
  const update = useMutation({ mutationFn: ({ id, ...d }) => adminApi.patch(`/skills/${id}`, d), onSuccess: () => { qc.invalidateQueries(['skills-admin']); setEditing(null); } });
  const remove = useMutation({ mutationFn: (id) => adminApi.delete(`/skills/${id}`), onSuccess: () => qc.invalidateQueries(['skills-admin']) });

  if (isLoading) return <div className="text-[var(--text-muted)]">Loading…</div>;

  return (
    <AdminPageWrapper title="Skills" subtitle="Skill groups shown in the Skills section" action={
      <button onClick={() => setShowForm(true)} className="btn btn-primary text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Group</button>
    }>
      {showForm && <SkillForm onSave={(d) => create.mutate(d)} onCancel={() => setShowForm(false)} loading={create.isPending} />}
      <div className="space-y-3">
        {(data || []).map((skill) => editing?._id === skill._id ? (
          <SkillForm key={skill._id} initial={editing} onSave={(d) => update.mutate({ id: skill._id, ...d })} onCancel={() => setEditing(null)} loading={update.isPending} />
        ) : (
          <div key={skill._id} className="card p-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-sm text-[var(--text)]">{skill.group}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{(skill.items || []).join(' · ')}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(skill)} className="p-1.5 rounded hover:bg-[var(--bg-subtle)]"><Pencil className="w-4 h-4 text-[var(--text-muted)]" /></button>
              <button onClick={() => remove.mutate(skill._id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminPageWrapper>
  );
};

export default SkillsManager;
