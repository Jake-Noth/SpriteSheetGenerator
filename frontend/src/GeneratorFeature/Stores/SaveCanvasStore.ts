import { create } from "zustand";

type SaveCanvas = {
  savedFrames: { [key: number]: string };
  setSavedFrames: (frame: number, url: string) => void;
  resetSavedFrames: () => void;
  deleteSavedFrame: (frame: number) => void;
};

export const useSaveCanvasStore = create<SaveCanvas>((set) => ({
  savedFrames: {},
  setSavedFrames: (frame, url) =>
    set((state) => ({
      savedFrames: {
        ...state.savedFrames,
        [frame]: url,
      },
    })),
  resetSavedFrames: () => set({ savedFrames: {} }),
  deleteSavedFrame: (frame) =>
    set((state) => {
      const newSavedFrames = { ...state.savedFrames };
      delete newSavedFrames[frame];
      return { savedFrames: newSavedFrames };
    }),
}));
