import { create } from "zustand";

type DrawCanvas = {
    time: number;
    canvas: HTMLCanvasElement | null;
    video: HTMLVideoElement | null;
    duration: number | null;
    slider: HTMLInputElement | null;

    setSlider: (slider: HTMLInputElement) => void;
    setDuration: (duration: number) => void;
    setTime: (time: number) => void;
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    setVideoSource: (video: HTMLVideoElement) => void;
    reset: () => void; // Add reset method
};

export const useDrawCanvasStore = create<DrawCanvas>((set) => ({
    time: 0,
    canvas: null,
    video: null,
    duration: null,
    slider: null,

    setSlider: (slider: HTMLInputElement) => set({ slider }),
    setDuration: (duration: number) => set({ duration }),
    setTime: (time: number) => set({ time }),
    setCanvas: (canvas: HTMLCanvasElement | null) => set({ canvas }),
    setVideoSource: (video: HTMLVideoElement) => set({ video }),
    reset: () =>
        set({
            time: 0,
            canvas: null,
            video: null,
            duration: null,
            slider: null,
        }), // Reset state to initial values
}));
