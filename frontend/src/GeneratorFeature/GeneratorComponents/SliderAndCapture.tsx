import { useDrawCanvasStore } from "../Stores/DrawCanvasStore";
import { drawFrame, seekVideo } from "../frameDrawer";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

export default function SliderAndCapture() {
    const {video, canvas } = useDrawCanvasStore();
    const { savedFrames, setSavedFrames } = useSaveCanvasStore();

    const sliderFPS = 1000;

    const maxSliderValue = video?.duration ? sliderFPS * video.duration : 0;

    const changeFrame  = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const frameIndex = parseInt(event.target.value, 10);
        const time = frameIndex / sliderFPS;

        if (video && canvas) {
            drawFrame(video,time, canvas);
        }
    };

    const compareCanvases = (canvas1: HTMLCanvasElement, canvas2: HTMLCanvasElement, tolerance: number = 10): boolean => {
        const ctx1 = canvas1.getContext("2d");
        const ctx2 = canvas2.getContext("2d");
    
        if (!ctx1 || !ctx2) {
            throw new Error("Failed to get canvas contexts.");
        }
    
        const data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        const data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    
        console.log("Canvas1 pixel data:", data1.data);
        console.log("Canvas2 pixel data:", data2.data);
    
        if (canvas1.width !== canvas2.width || canvas1.height !== canvas2.height) {
            console.log(canvas1.width)
            console.log(canvas2.width)
            console.log(canvas1.height)
            console.log(canvas2.height)
            return false; 

        }
    
        let diffCount = 0;
        for (let i = 0; i < data1.data.length; i++) {
            const diff = Math.abs(data1.data[i] - data2.data[i]);
            if (diff > tolerance) {
                diffCount++;
            }
        }
    
        return diffCount === 0; 
    };
    
    const captureFrame = () => {
        const slider = document.getElementById("FPS-slider") as HTMLInputElement;
    
        if (slider && !(Number(slider.value) in savedFrames)) {
            const captureCanvas = document.createElement("canvas");
            const ctx = captureCanvas.getContext("2d");
    
            if (!ctx) return;
    
            if (video) {
                // Set canvas size to match the video dimensions
                captureCanvas.width = video.videoWidth;
                captureCanvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
    
                const imageData = ctx.getImageData(0, 0, captureCanvas.width, captureCanvas.height);
                console.log("Captured frame pixel data:", imageData.data);
    
                const imageURL = captureCanvas.toDataURL("image/png");
                setSavedFrames(Number(slider.value), imageURL);
            }
        }
    };

    const findNextFrame = async () => {
        
        if (video) {
            const slider = document.getElementById("FPS-slider") as HTMLInputElement;

            if (canvas) {

                const currCanvas = document.createElement("canvas")

                currCanvas.width = canvas.width
                currCanvas.height = canvas.height

                await drawFrame(video, video.currentTime, currCanvas)
                
                const newCanvas = document.createElement("canvas");

                newCanvas.width = canvas.width
                newCanvas.height = canvas.height
                
                while (true) {

                    await drawFrame(video, video.currentTime + 0.001, newCanvas)

                    const same = compareCanvases(currCanvas, newCanvas);

                    console.log(same);

                    if (!same) {
                        await drawFrame(video, video.currentTime, canvas);
                        slider.value = String(video.currentTime * 1000);
                        break;
                    }
                }
                
            }
        }
    };

    const findPreviousFrame = () => {
        // Implement the function for finding the previous frame if needed
    };

    return (
        <div
            style={{
                height: "18%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
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
                onClick={findPreviousFrame}
            />
            <input
                id="FPS-slider"
                type="range"
                onChange={changeFrame}
                min={0}
                max={maxSliderValue}
                defaultValue={0}
                step={1}
            />
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
                onClick={findNextFrame}
            />
            
            <button style={{ marginLeft: "1%" }} onClick={captureFrame}>
                Capture Frame
            </button>
        </div>
    );
}
