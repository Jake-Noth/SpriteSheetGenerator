import { useState } from "react";
import BackModal from "./BackModal";
import { drawFrame } from "../frameDrawer";
import { useDrawCanvasStore } from "../DrawCanvasStore";
import { useSaveCanvasStore } from "../SaveCanvasStore";

export default function VideoAndBack() {
    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const { time, setTime, setDuration, canvas, setVideoSource, slider } = useDrawCanvasStore();
    const {resetSavedFrames} = useSaveCanvasStore()

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
                resetSavedFrames()
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
        <div id="header" style={{ height: "10%", width: "100%", display: "flex",flexDirection:"row",justifyContent:"space-between", alignItems:"center", border:"2px solid black" }}>
            
                <button
                    style={{ height: "80%", width: "20%"}}
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
                        height:"80%",
                        border: "2px solid black",
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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

            {showModal && <BackModal clearModal={hideModal} />}
        </div>
    );
}
