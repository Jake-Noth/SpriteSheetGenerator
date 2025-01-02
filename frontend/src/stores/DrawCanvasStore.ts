import { create } from "zustand";

type DrawCanvas = {
    fileObj: string | null;
    time: number;
    canvas: HTMLCanvasElement | null;
    video: HTMLVideoElement | null
    setFileObj: (fileObj: string | null) => void;
    setTime: (time: number) => void;
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    setVideoSource: (videoSource:HTMLVideoElement) => void;
};

export const useDrawCanvasStore = create<DrawCanvas>((set) => ({
    fileObj: null,
    time: 0,
    canvas: null,
    video: null,
    setFileObj: (fileObj: string | null) => set({ fileObj }),
    setTime: (time: number) => set({ time }),
    setCanvas: (canvas: HTMLCanvasElement | null) => set({ canvas }),
    setVideoSource: (video: HTMLVideoElement) => set({video})
}));
