import { useContext } from "react";
import { VideoContext } from "../context/Contex";


export default function useDrawFirstFrame(){

    const {canvasRef, ctxRef} = useContext(VideoContext)

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

    return drawFirstFrame

}