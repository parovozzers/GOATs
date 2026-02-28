import { apiClient } from './client';
import { AnalyticsSummary } from '@/types';

export const analyticsApi = {
  getSummary: () => apiClient.get<AnalyticsSummary>('/analytics/summary').then(r => r.data),
  getByNomination: () => apiClient.get<any[]>('/analytics/by-nomination').then(r => r.data),
  getTimeline: () => apiClient.get<any[]>('/analytics/timeline').then(r => r.data),
  getTopUniversities: () => apiClient.get<any[]>('/analytics/top-universities').then(r => r.data),
  getGeography: () => apiClient.get<any[]>('/analytics/geography').then(r => r.data),
  getKeywords: () => apiClient.get<any[]>('/analytics/keywords').then(r => r.data),
};
