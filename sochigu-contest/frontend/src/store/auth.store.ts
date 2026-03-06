import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role } from '@/types';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  university?: string;
  faculty?: string;
  department?: string;
  course?: number;
  city?: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    { name: 'sochigu-auth' },
  ),
);
