import { create } from "zustand";

type DrawCanvas = {
    
    time: number;
    canvas: HTMLCanvasElement | null;
    video: HTMLVideoElement | null
    
    setTime: (time: number) => void;
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    setVideoSource: (videoSource:HTMLVideoElement) => void;
};

export const useDrawCanvasStore = create<DrawCanvas>((set) => ({
   
    time: 0,
    canvas: null,
    video: null,

    setTime: (time: number) => set({ time }),
    setCanvas: (canvas: HTMLCanvasElement | null) => set({ canvas }),
    setVideoSource: (video: HTMLVideoElement) => set({video})
    
}));
