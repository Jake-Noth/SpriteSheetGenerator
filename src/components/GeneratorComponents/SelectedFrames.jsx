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
                    const videoAspectRatio = newVideoElement.videoWidth / newVideoElement.videoHeight;

                    const parentDiv = canvas.parentElement;
                    const divHeight = parentDiv.offsetHeight;
                    const divWidth = parentDiv.offsetWidth;
                    let canvasWidth, canvasHeight;

                    if (divWidth / divHeight > videoAspectRatio) {
                        canvasHeight = divHeight;
                        canvasWidth = canvasHeight * videoAspectRatio;
                    } else {
                        canvasWidth = divWidth;
                        canvasHeight = canvasWidth / videoAspectRatio;
                    }

                    // Scale down the canvas size by 90%
                    const scaleFactor = 0.93;
                    canvasWidth *= scaleFactor;
                    canvasHeight *= scaleFactor;

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
                <div className="frame-container" key={index}>
                    <canvas className = "frame" ref={(el) => setCanvas(el, index)} />
                </div>
            ))}
        </>
    );
}
