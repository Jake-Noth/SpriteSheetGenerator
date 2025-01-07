import { useDrawCanvasStore } from "../Stores/DrawCanvasStore";
import { drawFrame } from "../frameDrawer";
import { useCallback } from "react";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

interface SliderProps {
    FPS: number;
}

export default function SliderAndCapture(props: SliderProps) {
    const { duration, video, canvas, setSlider } = useDrawCanvasStore();
    const { savedFrames, setSavedFrames } = useSaveCanvasStore();

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

    const captureFrame = () => {
        const slider = document.getElementById("FPS-slider") as HTMLInputElement;

        if (slider && !(Number(slider.value) in savedFrames)) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            if (video) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageURL = canvas.toDataURL("image/png");
                setSavedFrames(Number(slider.value), imageURL);
            }
        }
    };

    const adjustFPS = (delta: number) => {
        const slider = document.getElementById("FPS-slider") as HTMLInputElement;
        if (slider) {
            // Calculate new value
            let newValue = Math.max(
                0,
                Math.min(maxSliderValue, Number(slider.value) + delta)
            );

            // Update slider value
            slider.value = String(newValue);

            // Trigger the changeFrame logic to sync video playback
            changeFrame({ target: slider } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div
            style={{
                height: "10%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTop: "1px solid black",
            }}
        >
            {/* Decrease FPS Button */}
            <div
                style={{
                    height: "25%",
                    width: "2%",
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: "url('/arrow.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    cursor: "pointer",
                }}
                onClick={() => adjustFPS(-1)} // Decrease FPS
            />
            <input
                id="FPS-slider"
                ref={storeSlider}
                type="range"
                onChange={changeFrame}
                min={0}
                max={maxSliderValue}
                defaultValue={0}
                step={1}
            />
            {/* Increase FPS Button */}
            <div
                style={{
                    height: "25%",
                    width: "2%",
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: "url('/arrow.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    transform: "rotate(180deg)",
                    cursor: "pointer",
                }}
                onClick={() => adjustFPS(1)} // Increase FPS
            />
            <button style={{ marginLeft: "1%" }} onClick={captureFrame}>
                Capture Frame
            </button>
        </div>
    );
}
