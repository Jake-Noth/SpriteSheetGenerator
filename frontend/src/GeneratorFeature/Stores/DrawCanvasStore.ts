import { create } from "zustand";

type DrawCanvas = {
    canvas: HTMLCanvasElement | null;
    video: HTMLVideoElement | null;
    ctx: CanvasRenderingContext2D | null;

    setCtx: (ctx: CanvasRenderingContext2D | null) => void;
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    setVideoSource: (video: HTMLVideoElement) => void;
};

export const useDrawCanvasStore = create<DrawCanvas>((set) => ({
    canvas: null,
    video: null,
    ctx: null,

    setCtx: (ctx: CanvasRenderingContext2D | null) => set({ ctx }),
    setCanvas: (canvas: HTMLCanvasElement | null) => set({ canvas }),
    setVideoSource: (video: HTMLVideoElement) => set({ video }),
}));
