import { useRef, useState } from "react";
import { drawFrame } from "../frameDrawer";
import { useGeneratorComponentStore } from "../Stores/GeneratorComponentStore";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";
import FramePreviewModal from "./FramePreviewModal";

export default function SliderAndOptions() {

    const { video, canvas, ctx, setSlider, slider } = useGeneratorComponentStore();
    const { savedFrames, setSavedFrames, resetSavedFrames } = useSaveCanvasStore();
    const [showModal, setShowModal] = useState<boolean>(false)

    const FPS = useRef<number>(1000)
    const increment = useRef<number>(1 / FPS.current)

    const maxSliderValue = video?.duration ? 1000 * video.duration : 0;

    const changeFPS = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value, 10);

        if (inputValue > 0) {
            FPS.current = inputValue
            increment.current = 1 / inputValue
        }
    }

    const saveSliderRef = (sliderRef: HTMLInputElement | null) => {
        if (slider === null && sliderRef) {
            setSlider(sliderRef);
        }
    };

    const changeFrame = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const frameIndex = parseInt(event.target.value, 10);
        const time = frameIndex / 1000;

        if (video && canvas && ctx) {
            drawFrame(video, time, canvas, ctx);
        }
    };

    const captureFrame = () => {

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

            console.log(savedFrames)
        }
    };

    const hashCanvasData = async (canvas: HTMLCanvasElement) => {
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

        if (video && canvas && ctx && slider) {

            const curCanvasHash = await hashCanvasData(canvas);

            while (true) {

                await drawFrame(video, video.currentTime + direction * increment.current, canvas, ctx);

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

    const hideModal = () => {
        setShowModal(false)
    }

    return (

        <>

            {showModal && <FramePreviewModal exitModal={hideModal} />}

            <div
                style={{
                    height: "20%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"

                }}
            >

                <div
                    style={{
                        display: "flex",
                        height: "50%",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            width: "25%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            onClick={resetSavedFrames}
                            style={{
                                backgroundColor: "#333",
                                color: "#fff",
                                border: "1px solid #444",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Clear Frames
                        </button>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            width: "25%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        FPS
                        <input
                            onChange={changeFPS}
                            type="number"
                            style={{
                                width: "25%",
                                backgroundColor: "#333",
                                color: "#fff",
                                border: "1px solid #444",
                                borderRadius: "5px",
                                padding: "5px",
                                textAlign: "center",
                            }}
                            defaultValue={240}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            width: "25%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            onClick={() => setShowModal(true)}
                            style={{
                                backgroundColor: "#333",
                                color: "#fff",
                                border: "1px solid #444",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Preview Frames
                        </button>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            width: "25%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            onClick={captureFrame}
                            style={{
                                backgroundColor: "#333",
                                color: "#fff",
                                border: "1px solid #444",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Select Frame
                        </button>
                    </div>
                </div>

                <div style={{ height: "50%", width: "100%", display: "flex", flexDirection: "row", borderTop: "0.5px solid black", justifyContent: "center", alignItems: "center" }}>

                    <div
                        style={{
                            height: "40%",
                            width: "4.5%",
                            border: "0.5px solid black",
                            borderRight: "none",
                            display: "flex",
                            justifyContent: "center",
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={findPreviousTwoFrames}
                    >
                        <div style={{
                            height: "100%",
                            width: "100%",
                            backgroundImage: "url('/double-arrow.webp')",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            transform: "scaleX(-1)"
                        }} />
                    </div>

                    <div
                        style={{
                            height: "40%",
                            width: "4%",
                            border: " 0.5px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                        }}
                        onClick={findPreviousFrame}
                    >
                        <div style={{
                            height: "76%",
                            width: "76%",
                            backgroundImage: "url('/arrow-icon.png')",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            cursor: "pointer",
                            transform: "scaleX(-1)"
                        }} />
                    </div>

                    <input
                        ref={saveSliderRef}
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
                            height: "40%",
                            width: "4%",
                            border: " 0.5px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                        }}
                        onClick={findNextFrame}
                    >
                        <div style={{
                            height: "76%",
                            width: "76%",
                            backgroundImage: "url('/arrow-icon.png')",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            cursor: "pointer",
                        }} />
                    </div>

                    <div
                        style={{
                            height: "40%",
                            width: "4.5%",
                            border: "0.5px solid black",
                            borderLeft: "none",
                            display: "flex",
                            justifyContent: "center",
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                            alignItems: "center",
                            cursor: "pointer",
                            marginRight: "1%"
                        }}
                        onClick={findNextTwoFrames}
                    >
                        <div style={{
                            height: "100%",
                            width: "100%",
                            backgroundImage: "url('/double-arrow.webp')",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                        }} />
                    </div>

                </div>

            </div>

        </>
    );
}
