import { useVideoContext } from "../../Context/VideoContext"

export default function FpsButtons() {
    const { videoFPS, setVideoFPS,  setSliderValue, videoElement, mainVideoCanvasRef} = useVideoContext();

    const handleFpsChange = (event) => {
        videoElement.currentTime = 0
        const canvas = mainVideoCanvasRef.current

        videoElement.onseeked = () => {
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            setSliderValue(0)
            setVideoFPS(parseInt(event.target.value));
        }
    };

    return (
        <>
            <label>
                <input
                    type="radio"
                    value="240"
                    checked={videoFPS === 240}
                    onChange={handleFpsChange}
                />
                240 FPS
            </label>
            <label>
                <input
                    type="radio"
                    value="120"
                    checked={videoFPS === 120}
                    onChange={handleFpsChange}
                />
                120 FPS
            </label>
            <label>
                <input
                    type="radio"
                    value="60"
                    checked={videoFPS === 60}
                    onChange={handleFpsChange}
                />
                60 FPS
            </label>
        </>
    );
}
