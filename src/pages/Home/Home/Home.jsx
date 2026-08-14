import { useCursorSpotlight } from '../../../hooks/useCursorSpotlight';
import AboutMeSection from '../../Components/AboutMe/AboutMeSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import EducationSection from '../../Components/EducationSection/EducationSection';
import ResumeSection from '../../Components/ResumeSection/ResumeSection';
import ExperienceSection from '../../Components/ExperienceSection/ExperienceSection';
import HeroSection from '../../Components/Hero/HeroSection';
import ProjectsSection from '../../Components/ProjectsSection/ProjectsSection';
import ResearchSection from '../../Components/ResearchSection/ResearchSection';
import SkillsSection from '../../Components/SkillsSection/SkillsSection';

const Home = () => {
  useCursorSpotlight();
  return (
    <main id='main-content'>
      <HeroSection />
      <AboutMeSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ResearchSection />
      <EducationSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
};

export default Home;
