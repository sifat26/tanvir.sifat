import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const ResearchManager = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['research-admin'], queryFn: () => adminApi.get('/research').then(r => r.data.data) });
  const [tab, setTab] = useState('main');
  const [main, setMain] = useState({ interests: [], thesis: { title: '', description: '' }, futureDirection: '' });
  const [showPubForm, setShowPubForm] = useState(false);
  const [editPub, setEditPub] = useState(null);
  const [showTimeForm, setShowTimeForm] = useState(false);
  const [editTime, setEditTime] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setMain({ interests: data.interests || [], thesis: data.thesis || { title: '', description: '' }, futureDirection: data.futureDirection || '' }); }, [data]);

  const updateMain = useMutation({ mutationFn: (d) => adminApi.put('/research', d), onSuccess: () => { qc.invalidateQueries(['research-admin']); setSaved(true); setTimeout(() => setSaved(false), 2500); } });
  const addPub = useMutation({ mutationFn: (d) => adminApi.post('/research/publications', d), onSuccess: () => { qc.invalidateQueries(['research-admin']); setShowPubForm(false); } });
  const updPub = useMutation({ mutationFn: ({ id, ...d }) => adminApi.patch(`/research/publications/${id}`, d), onSuccess: () => { qc.invalidateQueries(['research-admin']); setEditPub(null); } });
  const rmPub = useMutation({ mutationFn: (id) => adminApi.delete(`/research/publications/${id}`), onSuccess: () => qc.invalidateQueries(['research-admin']) });
  const addTime = useMutation({ mutationFn: (d) => adminApi.post('/research/timeline', d), onSuccess: () => { qc.invalidateQueries(['research-admin']); setShowTimeForm(false); } });
  const updTime = useMutation({ mutationFn: ({ id, ...d }) => adminApi.patch(`/research/timeline/${id}`, d), onSuccess: () => { qc.invalidateQueries(['research-admin']); setEditTime(null); } });
  const rmTime = useMutation({ mutationFn: (id) => adminApi.delete(`/research/timeline/${id}`), onSuccess: () => qc.invalidateQueries(['research-admin']) });

  const PubForm = ({ initial, onSave, onCancel, loading }) => {
    const [form, setForm] = useState(initial || { title: '', role: '', conference: '', venue: '', year: '', summary: '', abstract: '', tags: [] });
    return (
      <div className="card p-4 space-y-3 mb-3">
        {[['title', 'Title *'], ['role', 'Role'], ['conference', 'Conference'], ['venue', 'Venue'], ['year', 'Year'], ['summary', 'Summary']].map(([k, l]) => (
          <div key={k}><label className="block text-xs font-medium text-[var(--text)] mb-1">{l}</label>
            <input value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="input w-full text-sm" /></div>
        ))}
        <div><label className="block text-xs font-medium text-[var(--text)] mb-1">Abstract</label>
          <textarea value={form.abstract || ''} onChange={(e) => setForm({ ...form, abstract: e.target.value })} rows={3} className="input w-full resize-y text-sm" /></div>
        <div><label className="block text-xs font-medium text-[var(--text)] mb-1">Tags (comma-separated)</label>
          <input value={(form.tags || []).join(', ')} onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="input w-full text-sm" /></div>
        <div className="flex gap-2"><button onClick={() => onSave(form)} disabled={loading} className="btn btn-primary text-sm disabled:opacity-60">{loading ? 'Saving…' : 'Save'}</button><button onClick={onCancel} className="btn btn-secondary text-sm">Cancel</button></div>
      </div>
    );
  };

  const TimeForm = ({ initial, onSave, onCancel, loading }) => {
    const [form, setForm] = useState(initial || { year: '', title: '', description: '' });
    return (
      <div className="card p-4 space-y-3 mb-3">
        {[['year', 'Year'], ['title', 'Title *'], ['description', 'Description']].map(([k, l]) => (
          <div key={k}><label className="block text-xs font-medium text-[var(--text)] mb-1">{l}</label>
            <input value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="input w-full text-sm" /></div>
        ))}
        <div className="flex gap-2"><button onClick={() => onSave(form)} disabled={loading} className="btn btn-primary text-sm disabled:opacity-60">{loading ? 'Saving…' : 'Save'}</button><button onClick={onCancel} className="btn btn-secondary text-sm">Cancel</button></div>
      </div>
    );
  };

  if (isLoading) return <div className="text-[var(--text-muted)]">Loading…</div>;

  return (
    <AdminPageWrapper title="Research">
      <div className="flex gap-1 mb-5 bg-[var(--bg-subtle)] rounded-lg p-1 w-fit">
        {['main', 'publications', 'timeline'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-[var(--bg)] text-[var(--text)] shadow-sm' : 'text-[var(--text-muted)]'}`}>{t}</button>
        ))}
      </div>

      {tab === 'main' && (
        <div className="card p-6 space-y-4 max-w-2xl">
          <div><label className="block text-sm font-medium text-[var(--text)] mb-1.5">Research Interests (comma-separated)</label>
            <input value={(main.interests || []).join(', ')} onChange={(e) => setMain({ ...main, interests: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="input w-full" /></div>
          <div><label className="block text-sm font-medium text-[var(--text)] mb-1.5">Thesis Title</label>
            <input value={main.thesis?.title || ''} onChange={(e) => setMain({ ...main, thesis: { ...main.thesis, title: e.target.value } })} className="input w-full" /></div>
          <div><label className="block text-sm font-medium text-[var(--text)] mb-1.5">Thesis Description</label>
            <textarea value={main.thesis?.description || ''} onChange={(e) => setMain({ ...main, thesis: { ...main.thesis, description: e.target.value } })} rows={3} className="input w-full resize-y" /></div>
          <div><label className="block text-sm font-medium text-[var(--text)] mb-1.5">Future Direction</label>
            <textarea value={main.futureDirection || ''} onChange={(e) => setMain({ ...main, futureDirection: e.target.value })} rows={2} className="input w-full resize-y" /></div>
          <div className="flex items-center gap-3">
            <button onClick={() => updateMain.mutate(main)} disabled={updateMain.isPending} className="btn btn-primary disabled:opacity-60">{updateMain.isPending ? 'Saving…' : 'Save'}</button>
            {saved && <span className="text-sm text-green-600">Saved!</span>}
          </div>
        </div>
      )}

      {tab === 'publications' && (
        <div>
          <div className="flex justify-end mb-3"><button onClick={() => setShowPubForm(true)} className="btn btn-primary text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Publication</button></div>
          {showPubForm && <PubForm onSave={(d) => addPub.mutate(d)} onCancel={() => setShowPubForm(false)} loading={addPub.isPending} />}
          <div className="space-y-3">
            {(data?.publications || []).map((pub) => editPub?._id === pub._id ? (
              <PubForm key={pub._id} initial={editPub} onSave={(d) => updPub.mutate({ id: pub._id, ...d })} onCancel={() => setEditPub(null)} loading={updPub.isPending} />
            ) : (
              <div key={pub._id} className="card p-4 flex justify-between gap-3">
                <div><p className="font-medium text-sm text-[var(--text)]">{pub.title}</p><p className="text-xs text-[var(--text-muted)]">{pub.conference} · {pub.year}</p></div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditPub(pub)} className="p-1.5 rounded hover:bg-[var(--bg-subtle)]"><Pencil className="w-4 h-4 text-[var(--text-muted)]" /></button>
                  <button onClick={() => rmPub.mutate(pub._id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'timeline' && (
        <div>
          <div className="flex justify-end mb-3"><button onClick={() => setShowTimeForm(true)} className="btn btn-primary text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Item</button></div>
          {showTimeForm && <TimeForm onSave={(d) => addTime.mutate(d)} onCancel={() => setShowTimeForm(false)} loading={addTime.isPending} />}
          <div className="space-y-3">
            {(data?.timeline || []).map((item) => editTime?._id === item._id ? (
              <TimeForm key={item._id} initial={editTime} onSave={(d) => updTime.mutate({ id: item._id, ...d })} onCancel={() => setEditTime(null)} loading={updTime.isPending} />
            ) : (
              <div key={item._id} className="card p-4 flex justify-between gap-3">
                <div><p className="font-medium text-sm text-[var(--text)]">{item.title}</p><p className="text-xs text-[var(--text-muted)]">{item.year}</p></div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditTime(item)} className="p-1.5 rounded hover:bg-[var(--bg-subtle)]"><Pencil className="w-4 h-4 text-[var(--text-muted)]" /></button>
                  <button onClick={() => rmTime.mutate(item._id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminPageWrapper>
  );
};

export default ResearchManager;
