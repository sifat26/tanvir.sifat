import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../../components/ui/SectionHeader';
import api from '../../../lib/api';

const BlogSection = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => api.get('/blog').then((r) => r.data.data),
  });

  if (isLoading || !blogs?.length) return null;

  return (
    <section id='blog' className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)]'>
      <div className='container-page'>
        <SectionHeader eyebrow='Writing' title='Thoughts, research, and technical guides.' className='mb-10 sm:mb-14' />

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              className='group card flex flex-col h-full overflow-hidden hover:-translate-y-1 transition-all duration-300'
            >
              {blog.coverImage && (
                <div className='w-full h-48 bg-[var(--bg-subtle)] overflow-hidden'>
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                </div>
              )}
              <div className='p-6 flex flex-col flex-1'>
                <div className='flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3 font-mono'>
                  <Calendar className='w-3.5 h-3.5' />
                  {new Date(blog.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <h3 className='text-xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors'>
                  {blog.title}
                </h3>
                <p className='text-sm text-[var(--text-secondary)] line-clamp-3 mb-6 flex-1'>{blog.summary}</p>

                <div className='flex items-center text-[var(--accent)] font-medium text-sm gap-2 mt-auto'>
                  Read Article <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
