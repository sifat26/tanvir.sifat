import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

import { adminApi } from '../../lib/api';

const BlogManager = () => {
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    coverImage: '',
    published: false,
  });
  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => adminApi.get('/blog').then((r) => r.data.data),
  });

  const createMutation = useMutation({
    mutationFn: (data) => adminApi.post('/blog', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-blogs']);
      setEditing(null);
      alert('Blog created');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminApi.patch(`/blog/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-blogs']);
      setEditing(null);
      alert('Blog updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminApi.delete(`/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-blogs']);
      alert('Blog deleted');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing === 'new') createMutation.mutate(formData);
    else updateMutation.mutate({ id: editing._id, data: formData });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold text-[var(--text)]'>Blog Posts</h1>
        <button
          onClick={() => {
            setEditing('new');
            setFormData({ title: '', slug: '', summary: '', content: '', coverImage: '', published: false });
          }}
          className='btn btn-primary text-sm py-2 px-4 flex items-center gap-2'
        >
          <Plus className='w-4 h-4' /> New Post
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className='card p-6 space-y-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold'>{editing === 'new' ? 'New Post' : 'Edit Post'}</h2>
            <button type='button' onClick={() => setEditing(null)} className='p-1 hover:bg-[var(--bg-subtle)] rounded'>
              <X className='w-5 h-5' />
            </button>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm mb-1'>Title</label>
              <input
                type='text'
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className='input w-full'
                required
              />
            </div>
            <div>
              <label className='block text-sm mb-1'>Slug</label>
              <input
                type='text'
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className='input w-full'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm mb-1'>Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className='input w-full'
              rows='2'
              required
            />
          </div>

          <div>
            <label className='block text-sm mb-1'>Markdown Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className='input w-full font-mono text-sm'
              rows='10'
              required
            />
          </div>

          <div>
            <label className='block text-sm mb-1'>Cover Image URL</label>
            <input
              type='text'
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className='input w-full'
            />
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='published'
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <label htmlFor='published'>Published</label>
          </div>

          <button type='submit' className='btn btn-primary w-full py-2'>
            Save Post
          </button>
        </form>
      )}

      <div className='grid gap-4'>
        {blogs?.map((blog) => (
          <div key={blog._id} className='card p-5 flex justify-between items-center'>
            <div>
              <h3 className='font-semibold text-[var(--text)]'>{blog.title}</h3>
              <p className='text-sm text-[var(--text-muted)]'>
                /{blog.slug} •{' '}
                {blog.published ? (
                  <span className='text-emerald-500'>Published</span>
                ) : (
                  <span className='text-yellow-500'>Draft</span>
                )}
              </p>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => {
                  setEditing(blog);
                  setFormData(blog);
                }}
                className='p-2 bg-blue-100 text-blue-600 rounded-lg'
              >
                <Edit2 className='w-4 h-4' />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Delete this post?')) deleteMutation.mutate(blog._id);
                }}
                className='p-2 bg-red-100 text-red-600 rounded-lg'
              >
                <Trash2 className='w-4 h-4' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
