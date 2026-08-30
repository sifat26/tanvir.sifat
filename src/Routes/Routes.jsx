import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';

// Admin Imports
import AboutEditor from '../pages/admin/AboutEditor';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminLogin from '../pages/admin/AdminLogin';
import BlogManager from '../pages/admin/BlogManager';
import ChatLogsManager from '../pages/admin/ChatLogsManager';
import ContactInbox from '../pages/admin/ContactInbox';
import Dashboard from '../pages/admin/Dashboard';
import EducationManager from '../pages/admin/EducationManager';
import ExperienceManager from '../pages/admin/ExperienceManager';
import PersonalEditor from '../pages/admin/PersonalEditor';
import ProjectsManager from '../pages/admin/ProjectsManager';
import ProtectedRoute from '../pages/admin/ProtectedRoute';
import ResearchManager from '../pages/admin/ResearchManager';
import Settings from '../pages/admin/Settings';
import SkillsManager from '../pages/admin/SkillsManager';
import SocialsEditor from '../pages/admin/SocialsEditor';
import BlogReader from '../pages/Home/Blog/BlogReader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/blog/:slug',
        element: <BlogReader />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'personal', element: <PersonalEditor /> },
      { path: 'about', element: <AboutEditor /> },
      { path: 'experience', element: <ExperienceManager /> },
      { path: 'education', element: <EducationManager /> },
      { path: 'skills', element: <SkillsManager /> },
      { path: 'projects', element: <ProjectsManager /> },
      { path: 'research', element: <ResearchManager /> },
      { path: 'blog', element: <BlogManager /> },
      { path: 'contact', element: <ContactInbox /> },
      { path: 'chatlogs', element: <ChatLogsManager /> },
      { path: 'socials', element: <SocialsEditor /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);
