import { useState } from "react";
import BackModal from "./BackModal";
import { drawFrame } from "../frameDrawer";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";
import { useGeneratorComponentStore } from "../Stores/GeneratorComponentStore";

export default function VideoAndBack() {
    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const { canvas, setVideo, ctx, slider } = useGeneratorComponentStore();
    const { resetSavedFrames } = useSaveCanvasStore()

    const hideModal = () => setShowModal(false);
    const showTheModal = () => setShowModal(true);

    const resizeHelper = (video: HTMLVideoElement) => {
        if (canvas && ctx) {
            drawFrame(video, video.currentTime, canvas, ctx);
        }
    };

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && canvas && ctx && slider) {
            setFileName(file.name);
            const video = document.createElement("video");
            video.src = URL.createObjectURL(file);

            resetSavedFrames();
            video.addEventListener("loadeddata", () => {
                (async () => {
                    await drawFrame(video, 0, canvas, ctx);
                    setVideo(video);
                    slider.value = "0"
                    window.addEventListener("resize", () => resizeHelper(video));
                })().catch((err) => console.error("Error during video processing:", err));
            });
        }
    };


    return (
        <div id="header" style={{ height: "10%", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "2%", paddingLeft: "2%" }}>

            <div
                style={{ height: "40%", width: "10%", backgroundImage: "url('/back-arrow.webp')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                onClick={showTheModal}
            />

            <div
                style={{
                    height: "90%",
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
                    height: "50%",
                    border: "0.5px solid black",
                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20px"

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
