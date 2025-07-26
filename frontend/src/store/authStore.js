import { create } from 'zustand';
import authService from '../services/authService.js';

function safeParseJSON(item) {
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

const useAuthStore = create((set) => ({
  user: safeParseJSON(localStorage.getItem('user')),

  login: async (credentials) => {
    const res = await authService.login(credentials);
    const user = res.data || res.user;

    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  logout: async () => {
    await authService.logout();
    localStorage.removeItem('user');
    set({ user: null });
  },

  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
}));

export default useAuthStore;
