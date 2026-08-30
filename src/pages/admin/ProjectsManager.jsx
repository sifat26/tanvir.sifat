import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';
import ImageUploader from './ImageUploader';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const EMPTY = { type: 'personal', title: '', category: '', role: '', team: '', year: new Date().getFullYear().toString(), featured: false, tagline: '', overview: '', contributions: [], problem: '', solution: '', features: [], challenges: '', tech: [], image: '', links: { live: '', github: '', githubServer: '' } };

const ProjectForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial ? { ...EMPTY, ...initial, links: { ...EMPTY.links, ...(initial.links || {}) } } : EMPTY);
  const set = (k, v) => setForm({ ...form, [k]: v });
  const setLink = (k, v) => set('links', { ...form.links, [k]: v });
  const addArr = (k) => set(k, [...(form[k] || []), '']);
  const setArr = (k, i, v) => { const a = [...(form[k] || [])]; a[i] = v; set(k, a); };
  const rmArr = (k, i) => set(k, form[k].filter((_, j) => j !== i));

  return (
    <div className="card p-5 space-y-4 mb-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[var(--text)] mb-1">Type</label>
          <select value={form.type} onChange={(e) => set('type', e.target.value)} className="input w-full text-sm">
            <option value="personal">Personal</option><option value="client">Client</option>
          </select>
        </div>
        {[['title', 'Title *'], ['category', 'Category'], ['role', 'Role'], ['team', 'Team'], ['year', 'Year'], ['tagline', 'Tagline']].map(([k, l]) => (
          <div key={k}>
            <label className="block text-xs font-medium text-[var(--text)] mb-1">{l}</label>
            <input value={form[k] || ''} onChange={(e) => set(k, e.target.value)} className="input w-full text-sm" />
          </div>
        ))}
        <label className="flex items-center gap-2 text-sm text-[var(--text)]">
          <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4" /> Featured
        </label>
      </div>
      {['overview', 'problem', 'solution', 'challenges'].map((k) => (
        <div key={k}>
          <label className="block text-xs font-medium text-[var(--text)] mb-1 capitalize">{k}</label>
          <textarea value={form[k] || ''} onChange={(e) => set(k, e.target.value)} rows={2} className="input w-full resize-y text-sm" />
        </div>
      ))}
      {[['contributions', 'Contributions'], ['features', 'Features']].map(([k, l]) => (
        <div key={k}>
          <label className="block text-xs font-medium text-[var(--text)] mb-1">{l}</label>
          {(form[k] || []).map((item, i) => (
            <div key={i} className="flex gap-2 mb-1.5">
              <input value={item} onChange={(e) => setArr(k, i, e.target.value)} className="input w-full text-sm" />
              <button type="button" onClick={() => rmArr(k, i)} className="text-red-500"><X className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArr(k)} className="text-xs text-[var(--accent)] hover:underline">+ Add</button>
        </div>
      ))}
      <div>
        <label className="block text-xs font-medium text-[var(--text)] mb-1">Tech Stack (comma-separated)</label>
        <input value={(form.tech || []).join(', ')} onChange={(e) => set('tech', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className="input w-full text-sm" />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {[['live', 'Live URL'], ['github', 'GitHub Client'], ['githubServer', 'GitHub Server']].map(([k, l]) => (
          <div key={k}>
            <label className="block text-xs font-medium text-[var(--text)] mb-1">{l}</label>
            <input value={form.links[k] || ''} onChange={(e) => setLink(k, e.target.value)} className="input w-full text-sm" />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--text)] mb-2">Project Screenshot</label>
        <ImageUploader folder="projects" currentUrl={form.image} onUploaded={(url) => set('image', url)} />
      </div>
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} disabled={loading} className="btn btn-primary text-sm disabled:opacity-60">{loading ? 'Saving…' : 'Save'}</button>
        <button onClick={onCancel} className="btn btn-secondary text-sm">Cancel</button>
      </div>
    </div>
  );
};

const ProjectsManager = () => {
  const qc = useQueryClient();
  const [tab, setTab] = useState('client');
  const { data, isLoading } = useQuery({ queryKey: ['projects-admin', tab], queryFn: () => adminApi.get(`/projects?type=${tab}`).then(r => r.data.data) });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const create = useMutation({ mutationFn: (d) => adminApi.post('/projects', { ...d, type: tab }), onSuccess: () => { qc.invalidateQueries(['projects-admin']); setShowForm(false); } });
  const update = useMutation({ mutationFn: ({ id, ...d }) => adminApi.patch(`/projects/${id}`, d), onSuccess: () => { qc.invalidateQueries(['projects-admin']); setEditing(null); } });
  const remove = useMutation({ mutationFn: (id) => adminApi.delete(`/projects/${id}`), onSuccess: () => qc.invalidateQueries(['projects-admin']) });

  return (
    <AdminPageWrapper title="Projects" subtitle="Client work and personal projects" action={
      <button onClick={() => setShowForm(true)} className="btn btn-primary text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add</button>
    }>
      <div className="flex gap-1 mb-5 bg-[var(--bg-subtle)] rounded-lg p-1 w-fit">
        {['client', 'personal'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-[var(--bg)] text-[var(--text)] shadow-sm' : 'text-[var(--text-muted)]'}`}>{t}</button>
        ))}
      </div>
      {showForm && <ProjectForm initial={{ type: tab }} onSave={(d) => create.mutate(d)} onCancel={() => setShowForm(false)} loading={create.isPending} />}
      {isLoading ? <div className="text-[var(--text-muted)]">Loading…</div> : (
        <div className="space-y-3">
          {(data || []).map((proj) => editing?._id === proj._id ? (
            <ProjectForm key={proj._id} initial={editing} onSave={(d) => update.mutate({ id: proj._id, ...d })} onCancel={() => setEditing(null)} loading={update.isPending} />
          ) : (
            <div key={proj._id} className="card p-4 flex gap-4 items-start">
              {proj.image && <img src={proj.image} alt={proj.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[var(--text)]">{proj.title}</p>
                <p className="text-xs text-[var(--text-muted)]">{proj.category} · {proj.year}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">{proj.tagline}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(proj)} className="p-1.5 rounded hover:bg-[var(--bg-subtle)]"><Pencil className="w-4 h-4 text-[var(--text-muted)]" /></button>
                <button onClick={() => remove.mutate(proj._id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminPageWrapper>
  );
};

export default ProjectsManager;
