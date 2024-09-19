import { useContext } from "react";

import { VideoContext } from "../context/Contex";


export default function FileLoad(){

    const {
        setVideoElement,
        setVideoLength,
        setSliderNum,
        setNumFrames,
        videoFPS,
        canvasRef,
        ctxRef
    } = useContext(VideoContext)


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
        });
    
        drawFirstFrame(videoElement)
        
    };

    const drawFirstFrame = (videoElement) => {

        videoElement.currentTime = 0;
        videoElement.addEventListener('seeked', () => {
            drawCanvas(videoElement);
        });
    }
    
    const drawCanvas = (videoElement) => {
    
        const canvas = canvasRef.current;
    
        if (canvas) {
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
    
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
    
        ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
        } else {
        console.error("Canvas element not found.");
        }
    };
    

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



