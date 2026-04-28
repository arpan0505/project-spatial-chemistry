// ============================================================
// User Store — Zustand state for current user session
// ============================================================

import { create } from 'zustand';
import { User } from '@/types';

interface UserState {
  currentUser: User | null;
  isOnboarded: boolean;
  setCurrentUser: (user: User) => void;
  setOnboarded: (val: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isOnboarded: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  setOnboarded: (val) => set({ isOnboarded: val }),
  logout: () => set({ currentUser: null, isOnboarded: false }),
}));
