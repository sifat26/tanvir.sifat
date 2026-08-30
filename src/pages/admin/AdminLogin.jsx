import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminApi.post('/admin/login', form);
      const { accessToken, adminData } = res.data.data;
      localStorage.setItem('admin_token', accessToken);
      localStorage.setItem('admin_data', JSON.stringify(adminData));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Admin Login</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Portfolio Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Email</label>
            <input
              type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input w-full" placeholder="admin@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Password</label>
            <input
              type="password" required value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input w-full" placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
