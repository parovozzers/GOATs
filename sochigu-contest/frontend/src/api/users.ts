import { apiClient } from './client';
import { User } from '@/types';

export const usersApi = {
  getAll: (params?: { role?: string; search?: string; name?: string }) =>
    apiClient.get<User[]>('/users', { params }).then(r => r.data),
  getMe: () => apiClient.get<User>('/users/me').then(r => r.data),
  updateMe: (data: Partial<User>) => apiClient.patch<User>('/users/me', data).then(r => r.data),
  updateRole: (id: string, role: string) => apiClient.patch(`/users/${id}/role`, { role }).then(r => r.data),
  updateExpertProfile: (id: string, data: { avatarUrl?: string; position?: string; bio?: string; isExpertVisible?: boolean }) =>
    apiClient.patch(`/users/${id}/expert-profile`, data).then(r => r.data),
  getPublicExperts: () => apiClient.get<Pick<User, 'id' | 'firstName' | 'lastName' | 'middleName' | 'avatarUrl' | 'position' | 'bio'>[]>('/users/experts').then(r => r.data),
  uploadPhoto: (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return apiClient.post<{ url: string }>('/users/upload-photo', fd, { headers: { 'Content-Type': undefined } }).then(r => r.data.url);
  },
};
