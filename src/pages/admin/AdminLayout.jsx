import {
  Briefcase,
  ChevronRight,
  FileText,
  FlaskConical,
  FolderKanban,
  Globe,
  GraduationCap,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Settings,
  User,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/personal', label: 'Personal', icon: User },
  { to: '/admin/about', label: 'About', icon: Info },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/skills', label: 'Skills', icon: Zap },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/research', label: 'Research', icon: FlaskConical },
  { to: '/admin/blog', label: 'Blog', icon: FileText },
  { to: '/admin/contact', label: 'Inbox', icon: Mail },
  { to: '/admin/chatlogs', label: 'Chat Logs', icon: MessageSquare },
  { to: '/admin/socials', label: 'Socials', icon: Globe },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem('admin_data') || '{}');

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className='flex flex-col h-full'>
      {/* Logo */}
      <div className='p-5 border-b border-[var(--border)]'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center shrink-0'>
            <span className='text-white font-bold text-sm'>S</span>
          </div>
          <div>
            <p className='font-semibold text-sm text-[var(--text)]'>Portfolio Admin</p>
            <p className='text-xs text-[var(--text-muted)] truncate max-w-[140px]'>{adminData.email || ''}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 overflow-y-auto p-3 space-y-0.5'>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[var(--accent)] text-white font-medium'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]'
              }`
            }
          >
            <Icon className='w-4 h-4 shrink-0' />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className='p-3 border-t border-[var(--border)]'>
        <button
          onClick={logout}
          className='flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
        >
          <LogOut className='w-4 h-4' />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className='flex h-screen bg-[var(--bg)] overflow-hidden'>
      {/* Desktop sidebar */}
      <aside className='hidden lg:flex flex-col w-60 border-r border-[var(--border)] bg-[var(--bg-subtle)] shrink-0'>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className='lg:hidden fixed inset-0 z-50 flex'>
          <div className='fixed inset-0 bg-black/40' onClick={() => setSidebarOpen(false)} />
          <aside className='relative w-60 bg-[var(--bg-subtle)] border-r border-[var(--border)] flex flex-col'>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        {/* Top bar */}
        <header className='flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg)] shrink-0'>
          <button
            className='lg:hidden p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]'
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className='w-5 h-5' />
          </button>
          <div className='flex-1' />
          <a
            href='/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs text-[var(--text-muted)] hover:text-[var(--text)] flex items-center gap-1'
          >
            View Portfolio <ChevronRight className='w-3 h-3' />
          </a>
        </header>

        {/* Page content */}
        <main className='flex-1 overflow-y-auto p-5 lg:p-7'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
