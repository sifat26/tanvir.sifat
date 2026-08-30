import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCursorSpotlight } from '../../../hooks/useCursorSpotlight';
import { usePersonal } from '../../../hooks/usePortfolioData';
import AboutMeSection from '../../Components/AboutMe/AboutMeSection';
import BlogSection from '../../Components/BlogSection/BlogSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import EducationSection from '../../Components/EducationSection/EducationSection';
import ExperienceSection from '../../Components/ExperienceSection/ExperienceSection';
import HeroSection from '../../Components/Hero/HeroSection';
import ProjectsSection from '../../Components/ProjectsSection/ProjectsSection';
import ResearchSection from '../../Components/ResearchSection/ResearchSection';
import ResumeSection from '../../Components/ResumeSection/ResumeSection';
import SkillsSection from '../../Components/SkillsSection/SkillsSection';

const Home = () => {
  useCursorSpotlight();
  const { data: personal } = usePersonal();

  useEffect(() => {
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
      fetch(`${import.meta.env.VITE_API_URL}/analytics/visit`, { method: 'POST' }).catch(console.error);
    }
  }, []);


  const title = personal ? `${personal.name} - ${personal.role}` : 'Portfolio';
  const description = personal?.headline || 'Welcome to my portfolio';

  return (
    <main id='main-content'>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
      </Helmet>
      <HeroSection />
      <AboutMeSection />
      <ExperienceSection />
      <ProjectsSection />
      <BlogSection />
      <SkillsSection />
      <ResearchSection />
      <EducationSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
};

export default Home;
