import express from 'express';
import { AboutRoutes } from '../modules/About/about.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AnalyticsRoutes } from '../modules/Analytics/analytics.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { ChatLogsRoutes } from '../modules/ChatLogs/chatlogs.route';
import { ContactRoutes } from '../modules/Contact/contact.route';
import { EducationRoutes } from '../modules/Education/education.route';
import { ExperienceRoutes } from '../modules/Experience/experience.route';
import { PersonalRoutes } from '../modules/Personal/personal.route';
import { ProjectsRoutes } from '../modules/Projects/projects.route';
import { ResearchRoutes } from '../modules/Research/research.route';
import { SkillsRoutes } from '../modules/Skills/skills.route';
import { SocialsRoutes } from '../modules/Socials/socials.route';
import { UploadRoutes } from '../modules/Upload/upload.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/admin', route: AdminRoutes },
  { path: '/personal', route: PersonalRoutes },
  { path: '/socials', route: SocialsRoutes },
  { path: '/about', route: AboutRoutes },
  { path: '/experiences', route: ExperienceRoutes },
  { path: '/education', route: EducationRoutes },
  { path: '/skills', route: SkillsRoutes },
  { path: '/projects', route: ProjectsRoutes },
  { path: '/research', route: ResearchRoutes },
  { path: '/contact', route: ContactRoutes },
  { path: '/upload', route: UploadRoutes },
  { path: '/analytics', route: AnalyticsRoutes },
  { path: '/chatlogs', route: ChatLogsRoutes },
  { path: '/blog', route: BlogRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
