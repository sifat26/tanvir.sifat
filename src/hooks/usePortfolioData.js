import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import * as fallbackData from '../data/portfolio';

const STALE = 10 * 1000; // 10 seconds

export const usePersonal = () =>
  useQuery({
    queryKey: ['personal'],
    queryFn: () => api.get('/personal').then((r) => r.data.data).catch(() => fallbackData.personal),
    placeholderData: fallbackData.personal,
    staleTime: STALE,
  });

export const useSocials = () =>
  useQuery({
    queryKey: ['socials'],
    queryFn: () => api.get('/socials').then((r) => r.data.data).catch(() => fallbackData.socials),
    placeholderData: fallbackData.socials,
    staleTime: STALE,
  });

export const useAbout = () =>
  useQuery({
    queryKey: ['about'],
    queryFn: () => api.get('/about').then((r) => r.data.data).catch(() => fallbackData.about),
    placeholderData: fallbackData.about,
    staleTime: STALE,
  });

export const useExperiences = () =>
  useQuery({
    queryKey: ['experiences'],
    queryFn: () => api.get('/experiences').then((r) => r.data.data).catch(() => fallbackData.experiences),
    placeholderData: fallbackData.experiences,
    staleTime: STALE,
  });

export const useEducation = () =>
  useQuery({
    queryKey: ['education'],
    queryFn: () => api.get('/education').then((r) => r.data.data).catch(() => fallbackData.education),
    placeholderData: fallbackData.education,
    staleTime: STALE,
  });

export const useSkills = () =>
  useQuery({
    queryKey: ['skills'],
    queryFn: () => api.get('/skills').then((r) => r.data.data).catch(() => fallbackData.skills),
    placeholderData: fallbackData.skills,
    staleTime: STALE,
  });

export const useProjects = (type) =>
  useQuery({
    queryKey: ['projects', type],
    queryFn: () =>
      api
        .get('/projects', { params: type ? { type } : {} })
        .then((r) => r.data.data)
        .catch(() => (type === 'client' ? fallbackData.clientProjects : fallbackData.projects)),
    placeholderData: () => (type === 'client' ? fallbackData.clientProjects : fallbackData.projects),
    staleTime: STALE,
  });

export const useResearch = () =>
  useQuery({
    queryKey: ['research'],
    queryFn: () => api.get('/research').then((r) => r.data.data).catch(() => fallbackData.research),
    placeholderData: fallbackData.research,
    staleTime: STALE,
  });

export const useBlogs = () =>
  useQuery({
    queryKey: ['blogs'],
    queryFn: () => api.get('/blog').then((r) => r.data.data).catch(() => []),
    staleTime: STALE,
  });
