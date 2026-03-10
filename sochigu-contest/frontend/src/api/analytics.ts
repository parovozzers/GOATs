import { apiClient } from './client';
import {
  AnalyticsSummary, AnalyticsByNomination, AnalyticsTimeline,
  AnalyticsTopUniversity, AnalyticsGeography, AnalyticsKeyword,
} from '@/types';

export const analyticsApi = {
  getSummary: () => apiClient.get<AnalyticsSummary>('/analytics/summary').then(r => r.data),
  getByNomination: () => apiClient.get<AnalyticsByNomination[]>('/analytics/by-nomination').then(r => r.data),
  getTimeline: () => apiClient.get<AnalyticsTimeline[]>('/analytics/timeline').then(r => r.data),
  getTopUniversities: () => apiClient.get<AnalyticsTopUniversity[]>('/analytics/top-universities').then(r => r.data),
  getGeography: () => apiClient.get<AnalyticsGeography[]>('/analytics/geography').then(r => r.data),
  getKeywords: () => apiClient.get<AnalyticsKeyword[]>('/analytics/keywords').then(r => r.data),
};
