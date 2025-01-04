import { useDrawCanvasStore } from "../DrawCanvasStore";
import { drawFrame } from "../frameDrawer";
import { useCallback } from "react";
import { useSaveCanvasStore } from "../SaveCanvasStore"

interface SliderProps {
    FPS: number;
}

export default function SliderAndCapture(props: SliderProps) {
    const { duration, video, canvas, setSlider } = useDrawCanvasStore();
    const {savedFrames, setSavedFrames} = useSaveCanvasStore()

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
        const slider = document.getElementById("slider") as HTMLInputElement
            
        
        if (slider && !(Number(slider.value) in savedFrames)){
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")
            
            if(!ctx) return
            
            if(video){
                canvas.width = video?.videoWidth
                canvas.height = video?.videoHeight
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                const imageURL = canvas.toDataURL('image/png')
                setSavedFrames(Number(slider.value), imageURL)
                
            }
        }
        
    }

    return (
        <div
            style={{
                height: "20%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap:"1%",
                borderTop:"1px solid black"
            }}
        >
            <input
                id="slider"
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
                    WebkitAppearance: "none",
                }}
            />
            <button onClick={captureFrame}>Capture Frame</button>
        </div>
    );
}
