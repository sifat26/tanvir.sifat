import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';
import { Star, Trash2, Mail, MailOpen, StarOff } from 'lucide-react';

const ContactInbox = () => {
  const qc = useQueryClient();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const params = filter === 'unread' ? { isRead: false } : filter === 'starred' ? { isStarred: true } : {};
  const { data, isLoading } = useQuery({ queryKey: ['contacts-admin', filter], queryFn: () => adminApi.get('/contact', { params }).then(r => r.data.data) });

  const markRead = useMutation({ mutationFn: (id) => adminApi.patch(`/contact/${id}/read`), onSuccess: () => { qc.invalidateQueries(['contacts-admin']); qc.invalidateQueries(['admin-contacts']); } });
  const star = useMutation({ mutationFn: (id) => adminApi.patch(`/contact/${id}/star`), onSuccess: () => qc.invalidateQueries(['contacts-admin']) });
  const remove = useMutation({ mutationFn: (id) => adminApi.delete(`/contact/${id}`), onSuccess: () => { qc.invalidateQueries(['contacts-admin']); setSelected(null); } });

  const open = (msg) => { setSelected(msg); if (!msg.isRead) markRead.mutate(msg._id); };

  return (
    <AdminPageWrapper title="Contact Inbox" subtitle="Messages submitted via your portfolio contact form">
      <div className="flex gap-1 mb-4 bg-[var(--bg-subtle)] rounded-lg p-1 w-fit">
        {['all', 'unread', 'starred'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-[var(--bg)] text-[var(--text)] shadow-sm' : 'text-[var(--text-muted)]'}`}>{f}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {isLoading && <p className="text-sm text-[var(--text-muted)]">Loading…</p>}
          {(data || []).length === 0 && !isLoading && <p className="text-sm text-[var(--text-muted)]">No messages.</p>}
          {(data || []).map((msg) => (
            <button key={msg._id} onClick={() => open(msg)} className={`w-full text-left card p-3.5 transition-colors hover:border-[var(--accent)] ${selected?._id === msg._id ? 'border-[var(--accent)]' : ''} ${!msg.isRead ? 'border-l-4 border-l-blue-500' : ''}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`text-sm truncate ${!msg.isRead ? 'font-semibold text-[var(--text)]' : 'text-[var(--text)]'}`}>{msg.name}</p>
                  <p className="text-xs text-[var(--text-muted)] truncate">{msg.subject}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{new Date(msg.createdAt).toLocaleDateString()}</p>
                </div>
                {msg.isStarred && <Star className="w-4 h-4 text-yellow-500 shrink-0" />}
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="card p-5 h-full">
              <div className="flex items-start justify-between mb-4 gap-3">
                <div>
                  <h3 className="font-semibold text-[var(--text)]">{selected.subject}</h3>
                  <p className="text-sm text-[var(--text-muted)]">From: {selected.name} ({selected.email}){selected.phone ? ` · ${selected.phone}` : ''}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => star.mutate(selected._id)} className="p-1.5 rounded hover:bg-[var(--bg-subtle)]" title="Star">
                    {selected.isStarred ? <Star className="w-4 h-4 text-yellow-500" /> : <StarOff className="w-4 h-4 text-[var(--text-muted)]" />}
                  </button>
                  <button onClick={() => remove.mutate(selected._id)} className="p-1.5 rounded hover:bg-red-50" title="Delete">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="border-t border-[var(--border)] pt-4">
                <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-[var(--border)]">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn btn-primary text-sm inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="card p-5 flex items-center justify-center h-40 text-[var(--text-muted)]">
              <div className="text-center"><MailOpen className="w-8 h-8 mx-auto mb-2 opacity-40" /><p className="text-sm">Select a message to read</p></div>
            </div>
          )}
        </div>
      </div>
    </AdminPageWrapper>
  );
};

export default ContactInbox;
