import { create } from "zustand";

type SaveCanvas = {
  savedFrames: { [key: number]: string }; // Dictionary type with number keys and string values
  setSavedFrames: (frame: number, url: string) => void; // Function to add/update a frame
  resetSavedFrames: () => void; // Function to reset the saved frames
};

export const useSaveCanvasStore = create<SaveCanvas>((set) => ({
  savedFrames: {}, // Initialize as an empty dictionary
  setSavedFrames: (frame, url) =>
    set((state) => ({
      savedFrames: {
        ...state.savedFrames, // Retain existing frames
        [frame]: url, // Add or update the new frame
      },
    })),
  resetSavedFrames: () => set({ savedFrames: {} }), // Reset the saved frames
}));