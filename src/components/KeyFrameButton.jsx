import { useContext } from "react";
import { VideoContext } from "../context/Contex";

export default function KeyFrameButton() {
    const { videoElement, sliderNum, setFrames, numFrames, frames, orderByTime } = useContext(VideoContext);

    const selectFrame = () => {
        const durationPerFrame = videoElement.duration / numFrames;
        const frameTime = sliderNum * durationPerFrame;
        const frameFloat = parseFloat(frameTime);
        const frameExists = frames.some(frame => frame.frameFloat === frameFloat);

        if (!frameExists) {
            setFrames(prevFrames => {
                const updatedFrames = [...prevFrames, { frameFloat, value: null }];
                return updatedFrames;
            });
        }
    };

    return (
        <button onClick={selectFrame} id='keyframe-button'>Select Keyframe</button>
    );
}
