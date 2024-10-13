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
        <div id='fps-button-group'>
            <label>
                <input
                    id='240'
                    type="radio"
                    value="240"
                    checked={videoFPS === 240}
                    onChange={handleFpsChange}
                />
                240
            </label>
            <label>
                <input
                    id='120'
                    type="radio"
                    value="120"
                    checked={videoFPS === 120}
                    onChange={handleFpsChange}
                />
                120
            </label>
            <label>
                <input
                    id='60'
                    type="radio"
                    value="60"
                    checked={videoFPS === 60}
                    onChange={handleFpsChange}
                />
                60
            </label>
        </div>
    );
}
