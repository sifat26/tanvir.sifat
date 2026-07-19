import { motion } from 'motion/react';
import SectionHeader from '../../../components/ui/SectionHeader';
import { about, personal } from '../../../data/portfolio';

const AboutMeSection = () => {
  return (
    <section
      id='about'
      className='py-20 md:py-28 border-b border-[var(--border)]'
      aria-label='About Tanvir Ahmmed Sifat'
    >
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-10 md:gap-14'>
          <div className='md:col-span-4'>
            <SectionHeader eyebrow='About' title={about.headline} />
            <div className='mt-8 w-40 h-40 md:w-full md:max-w-[260px] aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]'>
              <img
                src={personal.portrait}
                alt={`${personal.name} — portrait`}
                loading='lazy'
                decoding='async'
                width='260'
                height='260'
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className='md:col-span-8 space-y-5 text-[16px] leading-[1.7] text-[var(--text-secondary)]'
          >
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
