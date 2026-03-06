import { apiClient } from './client';
import { User } from '@/types';

export const usersApi = {
  getAll: (params?: { role?: string; search?: string }) =>
    apiClient.get<User[]>('/users', { params }).then(r => r.data),
  getMe: () => apiClient.get<User>('/users/me').then(r => r.data),
  updateMe: (data: Partial<User>) => apiClient.patch<User>('/users/me', data).then(r => r.data),
};
