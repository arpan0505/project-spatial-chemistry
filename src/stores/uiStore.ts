// ============================================================
// UI Store — Zustand state for UI overlays and panels
// ============================================================

import { create } from 'zustand';

interface UIState {
  // Panels
  isNodePanelOpen: boolean;
  isToolbarOpen: boolean;
  isMatchOverlayOpen: boolean;
  isMiniMapOpen: boolean;

  // Camera
  isCameraAnimating: boolean;
  cameraTarget: [number, number, number] | null;

  // Loading
  isLoading: boolean;
  loadingMessage: string;

  // Actions
  openNodePanel: () => void;
  closeNodePanel: () => void;
  toggleToolbar: () => void;
  openMatchOverlay: () => void;
  closeMatchOverlay: () => void;
  toggleMiniMap: () => void;
  setCameraAnimating: (val: boolean) => void;
  setCameraTarget: (target: [number, number, number] | null) => void;
  setLoading: (loading: boolean, message?: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNodePanelOpen: false,
  isToolbarOpen: true,
  isMatchOverlayOpen: false,
  isMiniMapOpen: true,
  isCameraAnimating: false,
  cameraTarget: null,
  isLoading: false,
  loadingMessage: '',

  openNodePanel: () => set({ isNodePanelOpen: true }),
  closeNodePanel: () => set({ isNodePanelOpen: false }),
  toggleToolbar: () => set((s) => ({ isToolbarOpen: !s.isToolbarOpen })),
  openMatchOverlay: () => set({ isMatchOverlayOpen: true }),
  closeMatchOverlay: () => set({ isMatchOverlayOpen: false }),
  toggleMiniMap: () => set((s) => ({ isMiniMapOpen: !s.isMiniMapOpen })),
  setCameraAnimating: (val) => set({ isCameraAnimating: val }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setLoading: (loading, message = '') => set({ isLoading: loading, loadingMessage: message }),
}));
