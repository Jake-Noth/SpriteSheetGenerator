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
        setCanvasHeight,
        setCanvasWidth,
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
          setDimensions(videoElement)
        });
    };

    function setDimensions(videoElement) {
      const div = document.getElementById('canvas-section');
      const divWidth = div.offsetWidth;
    
      const naturalVidHeight = videoElement.videoHeight;
      const naturalVidWidth = videoElement.videoWidth;
      let finalWidth, finalHeight;
    
      // Check if the video is larger than the container; only scale down
      if (naturalVidWidth > divWidth) {
        const scalingFactor = divWidth / naturalVidWidth;
        finalHeight = naturalVidHeight * scalingFactor;
        finalWidth = divWidth;
        setCanvasHeight(finalHeight)
        setCanvasWidth(finalWidth)
      } else {
        finalHeight = naturalVidHeight;
        finalWidth = naturalVidWidth;
        setCanvasHeight(finalHeight)
        setCanvasWidth(finalWidth)
      }
    
      // Pass these dimensions directly to drawFirstFrame
      drawFirstFrame(videoElement, finalWidth, finalHeight);
    }
    
    return(
        <div id='form-content'>
        <form onSubmit={handleSubmit}>
          <input
            id="input"
            type='file'
            accept='video/*'
            onChange={setTheFile}
          />
        </form>
      </div>
    )

    
      
}