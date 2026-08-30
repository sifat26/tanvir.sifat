import { useQuery } from '@tanstack/react-query';
import { Download, Eye, FolderKanban, LayoutDashboard, Mail } from 'lucide-react';
import { adminApi } from '../../lib/api';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className='card p-5 flex items-center gap-4'>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
      <Icon className='w-5 h-5 text-white' />
    </div>
    <div>
      <p className='text-2xl font-bold text-[var(--text)]'>{value ?? '—'}</p>
      <p className='text-sm text-[var(--text-muted)]'>{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { data: contacts } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: () => adminApi.get('/contact').then((r) => r.data.data),
  });
  const { data: analytics } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: () => adminApi.get('/analytics').then((r) => r.data.data),
  });

  const unread = contacts?.filter((c) => !c.isRead).length ?? 0;

  return (
    <div>
      <div className='flex items-center gap-3 mb-6'>
        <LayoutDashboard className='w-5 h-5 text-[var(--accent)]' />
        <h1 className='text-xl font-bold text-[var(--text)]'>Dashboard</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8'>
        <StatCard icon={Eye} label='Total Visits' value={analytics?.visits ?? 0} color='bg-emerald-500' />
        <StatCard
          icon={Download}
          label='Resume Downloads'
          value={analytics?.resumeDownloads ?? 0}
          color='bg-pink-500'
        />
        <StatCard icon={Mail} label='Unread Messages' value={unread} color='bg-blue-500' />
        <StatCard icon={FolderKanban} label='Total Messages' value={contacts?.length ?? 0} color='bg-indigo-500' />
      </div>

      <div className='card p-5'>
        <h2 className='font-semibold text-[var(--text)] mb-3'>Quick Links</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
          {[
            {
              label: 'Personal Info',
              href: '/admin/personal',
              color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
            },
            {
              label: 'Projects',
              href: '/admin/projects',
              color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            },
            {
              label: 'Experience',
              href: '/admin/experience',
              color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            },
            {
              label: 'Education',
              href: '/admin/education',
              color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
            },
            {
              label: 'Research',
              href: '/admin/research',
              color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            },
            {
              label: 'Contact Inbox',
              href: '/admin/contact',
              color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
            },
          ].map(({ label, href, color }) => (
            <a
              key={href}
              href={href}
              className={`rounded-lg px-4 py-3 text-sm font-medium text-center transition-opacity hover:opacity-80 ${color}`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
