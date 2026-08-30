import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import api from '../../../lib/api';

const BlogReader = () => {
  const { slug } = useParams();
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => api.get(`/blog/${slug}`).then((r) => r.data.data),
  });

  if (isLoading) return <div className='min-h-screen flex items-center justify-center'>Loading...</div>;
  if (!blog) return <div className='min-h-screen flex items-center justify-center'>Blog not found</div>;

  return (
    <main className='min-h-screen bg-[var(--bg)] pt-24 pb-20'>
      <Helmet>
        <title>{blog.title}</title>
        <meta name='description' content={blog.summary} />
        {blog.coverImage && <meta property='og:image' content={blog.coverImage} />}
      </Helmet>

      <article className='max-w-3xl mx-auto px-5'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-8'
        >
          <ArrowLeft className='w-4 h-4' /> Back to Portfolio
        </Link>

        {blog.coverImage && (
          <img src={blog.coverImage} alt={blog.title} className='w-full h-[400px] object-cover rounded-2xl mb-10' />
        )}

        <header className='mb-12'>
          <div className='flex items-center gap-2 text-sm text-[var(--text-muted)] mb-4 font-mono'>
            <Calendar className='w-4 h-4' />
            {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight mb-6'>{blog.title}</h1>
        </header>

        <div className='prose prose-invert prose-lg max-w-none text-[var(--text-secondary)]'>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
};

export default BlogReader;
