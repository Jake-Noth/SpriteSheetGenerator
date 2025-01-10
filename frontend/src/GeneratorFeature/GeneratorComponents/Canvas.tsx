import { useGeneratorComponentStore } from "../Stores/GeneratorComponentStore";

export default function Canvas() {

    const { canvas, setCanvas, setCtx } = useGeneratorComponentStore()

    const canvasCallbackRef = (canvasElement: HTMLCanvasElement | null) => {
        if (canvasElement && !canvas) {
            setCanvas(canvasElement);
            const ctx = canvasElement.getContext("2d", { willBeReadFrequently: true }) as CanvasRenderingContext2D
            if (ctx) {
                setCtx(ctx)
            }
        }
    };

    return (
        <div style={{ height: "70%", width: "100%" }}>
            <canvas ref={canvasCallbackRef} style={{ height: "100%", width: "100%", borderTop: "0.5px solid black", borderBottom: "0.5px solid black" }} />
        </div>

    )
}