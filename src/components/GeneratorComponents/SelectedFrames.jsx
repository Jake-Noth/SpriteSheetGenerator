import { useEffect } from "react";
import { useVideoContext } from "../../Context/VideoContext";

export default function SelectedFrames() {
    const { frameTimes, frameRefs, videoElement } = useVideoContext();

    const setCanvas = (canvas, index) => {

        if (frameRefs.current.length > index && frameRefs.current[index]) {
            
            canvas = frameRefs.current[index];
            
        } else {

            const newVideoElement = document.createElement('video')
            newVideoElement.src = videoElement.src

            

            newVideoElement.onloadedmetadata = () =>{
                newVideoElement.currentTime = parseFloat(frameTimes[index].toFixed(8));
                newVideoElement.onseeked = () => {
                    const ctx = canvas.getContext("2d");
                    console.log('seekde')
                    const videoAspectRatio = newVideoElement.videoWidth / newVideoElement.videoHeight;
    
                    const parentDiv = canvas.parentElement;
                    const divHeight = parentDiv.offsetHeight-3;
                    const divWidth = parentDiv.offsetWidth;
                    let canvasWidth, canvasHeight;
    
                    if (divWidth / divHeight > videoAspectRatio) {
                        canvasHeight = divHeight;
                        canvasWidth = canvasHeight * videoAspectRatio;
                    } else {
                        canvasWidth = divWidth;
                        canvasHeight = canvasWidth / videoAspectRatio;
                    }
    
              
                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;
    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(newVideoElement, 0, 0, canvas.width, canvas.height);
                    frameRefs.current[index] = canvas;
                    
                };
            }
            
            
            
            
        }
        
    };

    return (
        <>
            {frameTimes.map((item, index) => (
                <div className="frame" key={index}>
                    <canvas ref={(el) => setCanvas(el, index)} />
                </div>
            ))}
        </>
    );
}
