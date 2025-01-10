import { create } from "zustand";

type PageAlter = {
  page: string;
  switchToGeneratorPage: () => void;
  switchToHome: () => void;
};

export const usePageStore = create<PageAlter>((set) => ({
  page: "home",
  switchToGeneratorPage: () => set(() => ({ page: "generator" })),
  switchToHome: () => set(() => ({ page: "home" }))
}));
