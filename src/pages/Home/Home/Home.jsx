import AboutMeSection from '../../Components/AboutMe/AboutMeSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import EducationSection from '../../Components/EducationSection/EducationSection';
import ExperienceSection from '../../Components/ExperienceSection/ExperienceSection';
import HeroSection from '../../Components/Hero/HeroSection';
import ProjectsSection from '../../Components/ProjectsSection/ProjectsSection';
import ResearchSection from '../../Components/ResearchSection/ResearchSection';
import SkillsSection from '../../Components/SkillsSection/SkillsSection';

const Home = () => {
  return (
    <main id='main-content'>
      <HeroSection />
      <AboutMeSection />
      <ExperienceSection />
      <ProjectsSection />
      <ResearchSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
};

export default Home;
