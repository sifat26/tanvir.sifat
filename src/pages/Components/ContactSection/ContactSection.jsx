import { ArrowUpRight, Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import SectionHeader from '../../../components/ui/SectionHeader';
import SocialLinks from '../../../components/ui/SocialLinks';
import { personal, socials } from '../../../data/portfolio';

const CONTACT_ENDPOINT = 'https://sifat-portfolio-backend.vercel.app/api/send';

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

const ContactSection = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  // status: null | { type: 'success' | 'error', message: string }
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');

      setStatus({
        type: 'success',
        message: 'Message sent. A confirmation email is on its way to you.',
      });
      setFormData(EMPTY_FORM);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Could not send your message. Please email me directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='contact' className='py-20 md:py-28' aria-label='Contact'>
      <div className='container-page'>
        <SectionHeader
          className='max-w-3xl'
          eyebrow='Contact'
          title="Let's talk about what you're building."
          size='lg'
        />
        <p className='mt-5 max-w-3xl text-[16px] md:text-[17px] leading-relaxed text-[var(--text-secondary)]'>
          {personal.availability}. If you&apos;re hiring or want to collaborate on research, send a message below or
          reach me directly by email.
        </p>

        <div className='mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14'>
          {/* Contact details */}
          <div className='lg:col-span-5'>
            <div className='space-y-6'>
              <a href={`mailto:${personal.email}`} className='flex items-center gap-3 group'>
                <span className='w-10 h-10 grid place-items-center rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)] shrink-0'>
                  <Mail className='w-4 h-4' />
                </span>
                <span>
                  <span className='block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]'>
                    Email
                  </span>
                  <span className='text-[14.5px] text-[var(--text)] group-hover:underline'>{personal.email}</span>
                </span>
              </a>

              <a
                href={personal.whatsapp}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 group'
              >
                <span className='w-10 h-10 grid place-items-center rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)] shrink-0'>
                  <Phone className='w-4 h-4' />
                </span>
                <span>
                  <span className='block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]'>
                    Phone / WhatsApp
                  </span>
                  <span className='text-[14.5px] text-[var(--text)] group-hover:underline'>{personal.phone}</span>
                </span>
              </a>

              <div className='flex items-center gap-3'>
                <span className='w-10 h-10 grid place-items-center rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)] shrink-0'>
                  <MapPin className='w-4 h-4' />
                </span>
                <span>
                  <span className='block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]'>
                    Location
                  </span>
                  <span className='text-[14.5px] text-[var(--text)]'>{personal.location}</span>
                </span>
              </div>
            </div>

            <div className='mt-8 pt-8 border-t border-[var(--border)]'>
              <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3'>
                Elsewhere
              </div>
              <SocialLinks className='-ml-2' links={['github', 'linkedin', 'twitter']} />
            </div>

            <a
              href={socials.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-8 inline-flex btn btn-secondary'
            >
              Connect on LinkedIn
              <ArrowUpRight className='w-3.5 h-3.5' />
            </a>
          </div>

          {/* Form */}
          <div className='lg:col-span-7'>
            <form onSubmit={handleSubmit} className='card p-6 md:p-8' noValidate>
              <div className='grid sm:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor='contact-name' className='block text-[13px] font-medium text-[var(--text)] mb-1.5'>
                    Name
                  </label>
                  <input
                    id='contact-name'
                    name='name'
                    type='text'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className='input'
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label htmlFor='contact-email' className='block text-[13px] font-medium text-[var(--text)] mb-1.5'>
                    Email
                  </label>
                  <input
                    id='contact-email'
                    name='email'
                    type='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className='input'
                    placeholder='you@example.com'
                  />
                </div>
                <div>
                  <label htmlFor='contact-phone' className='block text-[13px] font-medium text-[var(--text)] mb-1.5'>
                    Phone <span className='text-[var(--text-muted)] font-normal'>(optional)</span>
                  </label>
                  <input
                    id='contact-phone'
                    name='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={handleChange}
                    className='input'
                    placeholder='+880 …'
                  />
                </div>
                <div>
                  <label htmlFor='contact-subject' className='block text-[13px] font-medium text-[var(--text)] mb-1.5'>
                    Subject
                  </label>
                  <input
                    id='contact-subject'
                    name='subject'
                    type='text'
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className='input'
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div className='mt-4'>
                <label htmlFor='contact-message' className='block text-[13px] font-medium text-[var(--text)] mb-1.5'>
                  Message
                </label>
                <textarea
                  id='contact-message'
                  name='message'
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className='input resize-y'
                  placeholder='Tell me a little about your project or role…'
                />
              </div>

              <div className='mt-6 flex flex-wrap items-center gap-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed'
                >
                  {loading ? 'Sending…' : 'Send message'}
                  {!loading && <Send className='w-3.5 h-3.5' />}
                </button>

                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role='status'
                    aria-live='polite'
                    className={`text-[13.5px] ${
                      status.type === 'success'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {status.message}
                  </motion.p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
