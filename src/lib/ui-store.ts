import { create } from "zustand";

type UiState = {
  consultOpen: boolean;
  dialerOpen: boolean;
  videoOpen: boolean;
  applyJob: string | null;
  openConsult: () => void;
  closeConsult: () => void;
  openDialer: () => void;
  closeDialer: () => void;
  openVideo: () => void;
  closeVideo: () => void;
  openApply: (job: string) => void;
  closeApply: () => void;
};

export const useUi = create<UiState>((set) => ({
  consultOpen: false,
  dialerOpen: false,
  videoOpen: false,
  applyJob: null,
  openConsult: () => set({ consultOpen: true }),
  closeConsult: () => set({ consultOpen: false }),
  openDialer: () => set({ dialerOpen: true }),
  closeDialer: () => set({ dialerOpen: false }),
  openVideo: () => set({ videoOpen: true }),
  closeVideo: () => set({ videoOpen: false }),
  openApply: (job) => set({ applyJob: job }),
  closeApply: () => set({ applyJob: null }),
}));
