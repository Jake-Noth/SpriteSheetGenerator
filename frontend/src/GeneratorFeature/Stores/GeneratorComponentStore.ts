import { create } from "zustand";

type GeneratorComponents = {

    canvas: HTMLCanvasElement | null;
    setCanvas: (canvas: HTMLCanvasElement | null) => void;

    video: HTMLVideoElement | null;
    setVideo: (video: HTMLVideoElement) => void;

    ctx: CanvasRenderingContext2D | null;
    setCtx: (ctx: CanvasRenderingContext2D | null) => void;

    slider: HTMLInputElement | null;
    setSlider: (slider : HTMLInputElement | null) => void;
};

export const useGeneratorComponentStore = create<GeneratorComponents>((set) => ({
    
    canvas: null,
    setCanvas: (canvas: HTMLCanvasElement | null) => set({ canvas }),

    video: null,
    setVideo: (video: HTMLVideoElement) => set({ video }),

    ctx: null,
    setCtx: (ctx: CanvasRenderingContext2D | null) => set({ ctx }),

    slider: null,
    setSlider: (slider : HTMLInputElement | null) => set({ slider }),
}));
