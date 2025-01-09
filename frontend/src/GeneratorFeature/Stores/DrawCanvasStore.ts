import { create } from "zustand";

type DrawCanvas = {
    
    canvas: HTMLCanvasElement | null;
    video: HTMLVideoElement | null;
    
    

    
    
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    setVideoSource: (video: HTMLVideoElement) => void;
    reset: () => void; // Add reset method
};

export const useDrawCanvasStore = create<DrawCanvas>((set) => ({
    
    canvas: null,
    video: null,
    slider: null,

    
    
    setCanvas: (canvas: HTMLCanvasElement | null) => set({ canvas }),
    setVideoSource: (video: HTMLVideoElement) => set({ video }),
    reset: () =>
        set({
            
            canvas: null,
            video: null,
    
            
        }),
}));
