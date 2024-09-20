import { useContext } from "react";
import { VideoContext } from "../context/Contex";
import useDrawFirstFrame from "../hooks/DrawFirstFrame";

export default function FileLoad(){

    const {
        setVideoElement,
        setVideoLength,
        setFramesVideoElement,
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
  
      // Create two video elements
      const videoElement = document.createElement('video');
      const secondVideoElement = document.createElement('video');
  
      // Set the source for both video elements
      const videoURL = URL.createObjectURL(file);
      videoElement.src = videoURL;
      secondVideoElement.src = videoURL;
  
      // Update the context with both video elements
      setVideoElement(videoElement);
      setFramesVideoElement(secondVideoElement);
  
      // Set up event listener for the first video element
      videoElement.addEventListener('loadedmetadata', () => {
          setVideoLength(videoElement.duration);
          setNumFrames(videoElement.duration * videoFPS);
          videoElement.currentTime = 0;
      });
  
      drawFirstFrame(videoElement);
  };
    
    return(
      <div id='form-content'>
        <form id='input-form' onSubmit={handleSubmit}>
          <input
            id="file-upload"
            type="file"
            accept="video/*"
            onChange={setTheFile}
          />
        </form>
      </div>
    )

    
      
}



