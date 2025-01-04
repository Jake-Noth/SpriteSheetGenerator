import { useState } from "react";
import BackModal from "./BackModel";
import { drawFrame } from "./frameDrawer";
import { useDrawCanvasStore } from "../stores/DrawCanvasStore";

export default function VideoAndBack() {
    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const { time, setTime, setDuration, setCanvas, canvas, setVideoSource, slider } = useDrawCanvasStore();

    const canvasCallbackRef = (canvasElement: HTMLCanvasElement | null) => {
        if (canvasElement && !canvas) {
            setCanvas(canvasElement);
        }
    };

    const hideModal = () => setShowModal(false);
    const showTheModal = () => setShowModal(true);

    const resizeHelper = (video: HTMLVideoElement) => {
        if (canvas) {
            drawFrame(video, time, canvas);
        }
    };

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setFileName(file.name);
            const video = document.createElement("video");
            video.src = URL.createObjectURL(file);

            if (canvas) {
                if(slider) slider.value = "0"

                video.addEventListener("loadeddata", () => {
                    setDuration(video.duration);
                    setTime(0);
                    drawFrame(video, 0, canvas);
                    setVideoSource(video);
                    window.addEventListener("resize", () => resizeHelper(video));
                });
            }
        }
    };

    return (
        <div style={{ height: "60%", width: "100%", background: "purple", display: "flex", flexDirection: "column" }}>
            <div
                style={{
                    height: "10%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <button
                    style={{ height: "100%", width: "20%", backgroundColor: "green" }}
                    onClick={showTheModal}
                >
                    Back
                </button>

                <div
                    style={{
                        height: "100%",
                        width: "20%",
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "center",
                    }}
                >
                    {fileName ? fileName : "No Video Selected"}
                </div>

                <label
                    htmlFor="videoUpload"
                    className="upload-label"
                    style={{
                        border: "2px solid black",
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "1%",
                        marginBottom: "1%",
                    }}
                >
                    {fileName ? "Change Video" : "Upload Video"}
                </label>
                <input
                    type="file"
                    id="videoUpload"
                    name="videoUpload"
                    accept="video/*"
                    onChange={handleFile}
                    style={{ display: "none" }}
                />
            </div>

            <canvas ref={canvasCallbackRef} style={{ height: "90%", width: "100%", border: "2px solid black" }} />

            {showModal && <BackModal clearModal={hideModal} />}
        </div>
    );
}
