import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// For demo purposes, we'll use a hardcoded admin user
const DEMO_USER = {
  id: '1',
  email: 'admin@example.com',
  role: 'admin' as const,
};

const DEMO_PASSWORD = 'admin123';

// Load initial auth state from localStorage
const loadInitialState = (): { user: User | null; isAuthenticated: boolean } => {
  const storedUser = localStorage.getItem('authUser');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    return { user, isAuthenticated: true };
  }
  return { user: null, isAuthenticated: false };
};

export const useAuthStore = create<AuthState>((set) => {
  // Initialize with data from localStorage
  const initialState = loadInitialState();
  
  return {
    user: initialState.user,
    isAuthenticated: initialState.isAuthenticated,
    login: async (email: string, password: string) => {
      if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
        set({ user: DEMO_USER, isAuthenticated: true });
        localStorage.setItem('authUser', JSON.stringify(DEMO_USER));
      } else {
        throw new Error('Invalid credentials');
      }
    },
    logout: () => {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem('authUser');
    },
  };
});