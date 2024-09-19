import { useContext } from "react";
import { VideoContext } from "../context/Contex";


export default function KeyFrameButton(){

    const {videoElement, sliderNum, setFrames, numFrames, frames} = useContext(VideoContext)

    const selectFrame = () => {
        const durationPerFrame = videoElement.duration / numFrames;
        const frameTime = sliderNum * durationPerFrame;
        const frameFloat = parseFloat(frameTime)
        let newFrames = [...frames, frameFloat]
        newFrames.sort((a, b) => a - b)
        setFrames(newFrames) 
    }

    return(
        <button onClick={selectFrame} id='keyframe-button'>Select Keyframe</button>
    )
}