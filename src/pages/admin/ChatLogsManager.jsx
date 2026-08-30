import { useQuery } from '@tanstack/react-query';
import { Clock, MessageSquare } from 'lucide-react';
import { adminApi } from '../../lib/api';

const ChatLogsManager = () => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['admin-chatlogs'],
    queryFn: () => adminApi.get('/chatlogs').then((r) => r.data.data),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <MessageSquare className='w-5 h-5 text-[var(--accent)]' />
        <h1 className='text-xl font-bold text-[var(--text)]'>Chatbot Logs</h1>
      </div>

      <p className='text-sm text-[var(--text-muted)]'>
        View recent conversations visitors have had with your AI assistant.
      </p>

      {logs?.length === 0 ? (
        <div className='card p-6 text-center text-[var(--text-muted)]'>No chat logs found yet.</div>
      ) : (
        <div className='space-y-4'>
          {logs?.map((log) => (
            <div key={log._id} className='card p-5'>
              <div className='flex items-center gap-2 mb-4 text-xs text-[var(--text-muted)]'>
                <Clock className='w-3 h-3' />
                <span>{new Date(log.updatedAt).toLocaleString()}</span>
                <span className='px-2 py-0.5 bg-[var(--bg-subtle)] rounded border'>Session: {log.sessionId}</span>
              </div>

              <div className='space-y-3'>
                {log.messages
                  .filter((m) => m.role !== 'system')
                  .map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-[var(--accent-soft)] ml-8' : 'bg-[var(--bg-subtle)] mr-8'}`}
                    >
                      <strong className='block text-xs mb-1 opacity-70'>
                        {msg.role === 'user' ? 'Visitor' : 'AI'}
                      </strong>
                      {msg.content}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatLogsManager;
