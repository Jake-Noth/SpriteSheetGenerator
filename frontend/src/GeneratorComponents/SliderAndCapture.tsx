import { useDrawCanvasStore } from "../stores/DrawCanvasStore";
import { drawFrame } from "./frameDrawer";
import { useCallback } from "react";

interface SliderProps {
    FPS: number;
}

export default function SliderAndCapture(props: SliderProps) {
    const { duration, video, canvas, setSlider } = useDrawCanvasStore();

    const maxSliderValue = duration ? props.FPS * duration : 0;

    const changeFrame = (event: React.ChangeEvent<HTMLInputElement>) => {
        const frameIndex = parseInt(event.target.value, 10);
        const time = frameIndex / props.FPS;

        if (video && canvas) {
            drawFrame(video, time, canvas);
        }
    };

    const storeSlider = useCallback(
        (slider: HTMLInputElement | null) => {
            if (slider) setSlider(slider);
        },
        [setSlider]
    );

    return (
        <div
            style={{
                height: "20%",
                width: "100%",
                backgroundColor: "blue",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <input
    ref={storeSlider}
    type="range"
    onChange={changeFrame}
    min={0}
    max={maxSliderValue}
    defaultValue={0}
    step={1}
    style={{
        width: "80%",
        appearance: "none",
        height: "15px",
        background: "#ddd",
        borderRadius: "4px",
        outline: "none",
        cursor: "pointer",
        // Webkit Thumb Style
        WebkitAppearance: "none",
    }}
/>
        </div>
    );
}
