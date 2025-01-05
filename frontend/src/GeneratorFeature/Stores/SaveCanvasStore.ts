import { create } from "zustand";

type SaveCanvas = {
  savedFrames: { [key: number]: string }; // Dictionary type with number keys and string values
  setSavedFrames: (frame: number, url: string) => void; // Function to add/update a frame
  resetSavedFrames: () => void; // Function to reset the saved frames
  deleteSavedFrame: (frame: number) => void; // Function to delete a frame by its key
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
  deleteSavedFrame: (frame) =>
    set((state) => {
      const newSavedFrames = { ...state.savedFrames };
      delete newSavedFrames[frame]; // Delete the key-value pair
      return { savedFrames: newSavedFrames }; // Update the state
    }),
}));
