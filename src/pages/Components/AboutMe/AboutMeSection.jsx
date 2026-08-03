import Disclosure from '../../../components/ui/Disclosure';
import Reveal from '../../../components/ui/Reveal';
import ResumeButton from '../../../components/ui/ResumeButton';
import SectionHeader from '../../../components/ui/SectionHeader';
import { about, personal } from '../../../data/portfolio';

const AboutMeSection = () => {
  return (
    <section
      id='about'
      className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)]'
      aria-label='About Tanvir Ahmmed Sifat'
    >
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
          <div className='md:col-span-4'>
            <SectionHeader eyebrow='About' title={about.headline} />
            <div className='mt-6 sm:mt-8 w-32 h-32 sm:w-40 sm:h-40 md:w-full md:max-w-[260px] aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]'>
              <picture>
                <source srcSet={personal.portraitSquareWebp} type='image/webp' />
                <img
                  src={personal.portraitSquare}
                  alt={`${personal.name} — portrait`}
                  loading='lazy'
                  decoding='async'
                  width='520'
                  height='520'
                  className='w-full h-full object-cover'
                />
              </picture>
            </div>
          </div>

          <Reveal className='md:col-span-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--text-secondary)]'>
            {about.short.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <Disclosure panelClassName='space-y-5 pt-5' toggleClassName='mt-1'>
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Disclosure>

            <div className='pt-2'>
              <ResumeButton variant='secondary' />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
