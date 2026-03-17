import { apiClient } from './client';
import {
  AnalyticsSummary, AnalyticsByNomination, AnalyticsTimeline,
  AnalyticsGeography, AnalyticsByStatus, AnalyticsActivityItem,
} from '@/types';

export const analyticsApi = {
  getSummary: () => apiClient.get<AnalyticsSummary>('/analytics/summary').then(r => r.data),
  getByNomination: () => apiClient.get<AnalyticsByNomination[]>('/analytics/by-nomination').then(r => r.data),
  getTimeline: () => apiClient.get<AnalyticsTimeline[]>('/analytics/timeline').then(r => r.data),
  getGeography: () => apiClient.get<AnalyticsGeography[]>('/analytics/geography').then(r => r.data),
  getByStatus: () => apiClient.get<AnalyticsByStatus[]>('/analytics/by-status').then(r => r.data),
  getActivity: () => apiClient.get<AnalyticsActivityItem[]>('/analytics/activity').then(r => r.data),
};
