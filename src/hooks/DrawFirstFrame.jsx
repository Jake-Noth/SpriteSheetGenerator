import { useContext } from "react";
import { VideoContext } from "../context/Contex";


export default function useDrawFirstFrame(){

    const {canvasRef, ctxRef} = useContext(VideoContext)

    const drawFirstFrame = (videoElement, finalWidth, finalHeight) => {

        videoElement.currentTime = 0;
        videoElement.addEventListener('seeked', () => {
            drawCanvas(videoElement, finalWidth, finalHeight);
        });
    }
    
    const drawCanvas = (videoElement, width, height) => {
    
        const canvas = canvasRef.current;
    
        if (canvas) {
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
    
        canvas.width = width;
        canvas.height = height;
    
        ctx.drawImage(videoElement, 0, 0, width, height);
        } else {
        console.error("Canvas element not found.");
        }
    };

    return drawFirstFrame

}