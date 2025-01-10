import { useDrawCanvasStore } from "../Stores/DrawCanvasStore";
import { drawFrame } from "../frameDrawer";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

export default function SliderAndCapture() {

    const {video, canvas, ctx} = useDrawCanvasStore();
    const { savedFrames, setSavedFrames } = useSaveCanvasStore();

    const sliderFPS = 1000;

    const maxSliderValue = video?.duration ? sliderFPS * video.duration : 0;

    const changeFrame  = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const frameIndex = parseInt(event.target.value, 10);
        const time = frameIndex / sliderFPS;

        if (video && canvas && ctx) {
            drawFrame(video,time, canvas, ctx);
        }
    };
    
    const captureFrame = () => {
        const slider = document.getElementById("FPS-slider") as HTMLInputElement;
    
        if (slider && !(Number(slider.value) in savedFrames)) {
            const captureCanvas = document.createElement("canvas");
            const captureCanvasCtx = captureCanvas.getContext("2d");
    
            if (!captureCanvasCtx) return;
    
            if (video) {
                captureCanvas.width = video.videoWidth;
                captureCanvas.height = video.videoHeight;
                captureCanvasCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
                const imageURL = captureCanvas.toDataURL("image/png");
                setSavedFrames(Number(slider.value), imageURL);
            }
        }
    };

    const hashCanvasData = async (canvas:HTMLCanvasElement) => {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error("Provided variable is not a canvas element.");
        }
    
        if (!ctx) {
            throw new Error("Failed to get canvas rendering context.");
        }
    
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
    
        const buffer = new Uint8Array(data);
    
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    
        return Array.from(new Uint8Array(hashBuffer))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    }

    const findFrame = async (direction: number) => {

        if (video && canvas && ctx) {
            const slider = document.getElementById("FPS-slider") as HTMLInputElement;
            const curCanvasHash = await hashCanvasData(canvas);

            while (true) {

                await drawFrame(video, video.currentTime + direction * 0.01, canvas, ctx);

                const newFrameHash = await hashCanvasData(canvas);

                if (curCanvasHash !== newFrameHash) {
                    slider.value = String(video.currentTime * 1000);
                    break;
                }

                if (direction > 0) {
                    if (video.currentTime === video.duration) {
                        break;
                    }
                } else if (direction < 0) {
                    if (video.currentTime === 0) {
                        break;
                    }
                }
            }
            
        }
    };

    const findNextFrame = async () => {
        await findFrame(1)
    };

    const findPreviousFrame = async () => {
        await findFrame(-1)
    };

    const findNextTwoFrames = async () => {
        await findFrame(1)
        await findFrame(1)
    }

    const findPreviousTwoFrames = async () => {
        await findFrame(-1)
        await findFrame(-1)
    }

    return (
        <div
            style={{
                height: "18%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft:"1%"
            }}
        >
            
            <div
                style={{
                    height: "25%",
                    width: "4.5%",
                    border: "2px solid black",
                    borderRight: "none",
                    display: "flex",
                    justifyContent: "center",
                    borderTopLeftRadius:"10px",
                    borderBottomLeftRadius:"10px",
                    alignItems: "center",
                    cursor: "pointer",
                }}
                onClick={findPreviousTwoFrames}
            >
                <div style={{
                    height:"100%", 
                    width:"100%",
                    backgroundImage: "url('/double-arrow.webp')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    transform: "scaleX(-1)"
                    }}/>
            </div>

            <div
                style={{
                    height: "25%",
                    width: "4%",
                    border:" 2px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    
                }}
                onClick={findPreviousFrame}
            >
                <div style={{
                    height:"76%",
                    width:"76%",
                    backgroundImage: "url('/arrow-icon.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    cursor: "pointer",
                    transform:"scaleX(-1)"
                }}/>
            </div>

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
                    width: "4%",
                    border:" 2px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    
                }}
                onClick={findNextFrame}
            >
                <div style={{
                    height:"76%",
                    width:"76%",
                    backgroundImage: "url('/arrow-icon.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    cursor: "pointer",
                }}/>
            </div>

            <div
                style={{
                    height: "25%",
                    width: "4.5%",
                    border: "2px solid black",
                    borderLeft:"none",
                    display: "flex",
                    justifyContent: "center",
                    borderTopRightRadius:"10px",
                    borderBottomRightRadius:"10px",
                    alignItems: "center",
                    cursor: "pointer",
                    marginRight:"1%"
                }}
                onClick={findNextTwoFrames}
            >
                <div style={{
                    height:"100%", 
                    width:"100%",
                    backgroundImage: "url('/double-arrow.webp')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    }}/>
            </div>

            <button style={{ marginLeft: "2%" }} onClick={captureFrame}>
                Capture Frame
            </button>
        </div>
    );
}
