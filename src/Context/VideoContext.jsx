import { createContext, useState, useContext, useRef } from "react";


const VideoContext = createContext()

const VideoProvider = ({children}) => {

    const [videoElement, setVideoElement] = useState(null)
    const [videoLength, setVideoLength] = useState(null)
    const [framesVideoElement, setFramesVideoElement]  = useState(null)
    const [videoFPS, setVideoFPS] = useState(60)
    const [sliderValue, setSliderValue] = useState(0)
    const mainVideoCanvasRef = useRef(null)
    const frameRefs = useRef(null)
    const [frameTimes, setFrameTimes] = useState([])

    const value = {
        videoElement,
        setVideoElement,
        videoLength,
        setVideoLength,
        framesVideoElement,
        setFramesVideoElement,
        videoFPS,
        setVideoFPS,
        sliderValue,
        setSliderValue,
        mainVideoCanvasRef,
        frameRefs,
        frameTimes,
        setFrameTimes
    }


    return(
        <VideoContext.Provider value={value}>
            {children}
        </VideoContext.Provider>
    )
}

const useVideoContext = () => {
    return useContext(VideoContext);
};

export { VideoProvider, useVideoContext };
