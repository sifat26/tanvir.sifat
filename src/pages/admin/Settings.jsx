import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import AdminPageWrapper from './AdminPageWrapper';

const Settings = () => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const mutation = useMutation({
    mutationFn: (d) => adminApi.patch('/admin/change-password', d),
    onSuccess: (res) => {
      const newToken = res.data.data?.accessToken;
      if (newToken) localStorage.setItem('admin_token', newToken);
      setSuccess('Password changed successfully!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    },
    onError: (err) => setError(err.response?.data?.message || 'Failed to change password'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.newPassword !== form.confirmPassword) { setError('New passwords do not match.'); return; }
    if (form.newPassword.length < 6) { setError('New password must be at least 6 characters.'); return; }
    mutation.mutate({ currentPassword: form.currentPassword, newPassword: form.newPassword });
  };

  return (
    <AdminPageWrapper title="Settings" subtitle="Manage your admin account">
      <form onSubmit={handleSubmit} className="card p-6 space-y-4 max-w-sm">
        <h3 className="font-medium text-[var(--text)]">Change Password</h3>
        {['currentPassword', 'newPassword', 'confirmPassword'].map((k) => (
          <div key={k}>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">{k === 'currentPassword' ? 'Current Password' : k === 'newPassword' ? 'New Password' : 'Confirm New Password'}</label>
            <input type="password" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required className="input w-full" placeholder="••••••••" />
          </div>
        ))}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
        <button type="submit" disabled={mutation.isPending} className="btn btn-primary w-full disabled:opacity-60">
          {mutation.isPending ? 'Changing…' : 'Change Password'}
        </button>
      </form>
    </AdminPageWrapper>
  );
};

export default Settings;
