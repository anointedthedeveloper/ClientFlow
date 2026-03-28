import { create } from 'zustand';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (orgName: string, name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    Cookies.set('accessToken', data.accessToken, { expires: 1 });
    const me = await api.get('/auth/me');
    set({ user: me.data });
  },

  register: async (orgName, name, email, password) => {
    const { data } = await api.post('/auth/register', { orgName, name, email, password });
    Cookies.set('accessToken', data.accessToken, { expires: 1 });
    const me = await api.get('/auth/me');
    set({ user: me.data });
  },

  logout: () => {
    Cookies.remove('accessToken');
    set({ user: null });
  },

  fetchMe: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
