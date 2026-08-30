import Disclosure from '../../../components/ui/Disclosure';
import ResumeButton from '../../../components/ui/ResumeButton';
import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { useAbout, usePersonal } from '../../../hooks/usePortfolioData';

const AboutMeSection = () => {
  const { data: about, isLoading: isAboutLoading } = useAbout();
  const { data: personal, isLoading: isPersonalLoading } = usePersonal();

  if (isAboutLoading || isPersonalLoading || !about || !personal) {
    return null;
  }

  return (
    <section
      id='about'
      className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg-subtle)]'
      aria-label='About Tanvir Ahmmed Sifat'
    >
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
          <div className='md:col-span-4'>
            <SectionHeader eyebrow='About' title={about.headline} />
            <div className='mt-6 sm:mt-8 w-36 h-36 sm:w-44 sm:h-44 md:w-full md:max-w-[260px] aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]'>
              <picture>
                {personal.portraitSquareWebp && <source srcSet={personal.portraitSquareWebp} type='image/webp' />}
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
            {(about.short || []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {(about.paragraphs || []).length > 0 && (
              <Disclosure panelClassName='space-y-5 pt-5' toggleClassName='mt-1'>
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Disclosure>
            )}

            <div className='pt-2'>
              <ResumeButton variant='secondary' url={personal.resumeUrl} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
