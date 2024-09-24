import { useContext } from "react";
import { VideoContext } from "../context/Contex";
import useDrawFirstFrame from "../hooks/DrawFirstFrame";

export default function FileLoad(){

    const {
        setVideoElement,
        setVideoLength,
        setSliderNum,
        setNumFrames,
        videoFPS,
    } = useContext(VideoContext)

    const drawFirstFrame = useDrawFirstFrame()


    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const setTheFile = (event) => {
        const file = event.target.files[0];
        setSliderNum(0);
        const videoElement = document.createElement('video');
        videoElement.src = URL.createObjectURL(file);
        setVideoElement(videoElement);
    
        videoElement.addEventListener('loadedmetadata', () => {
          setVideoLength(videoElement.duration);
          setNumFrames(videoElement.duration * videoFPS);
          videoElement.currentTime = 0;
          drawFirstFrame(videoElement)
        });
    };
    
    return(
        <form onSubmit={handleSubmit}>
          <input
            id="file-upload"
            type='file'
            accept='video/*'
            onChange={setTheFile}
          />
        </form>
    )

    
      
}