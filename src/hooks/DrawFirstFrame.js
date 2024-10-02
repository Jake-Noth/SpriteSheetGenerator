import { useContext } from "react";
import { VideoContext } from "../context/Contex";


export default function useDrawFirstFrame(){

    const {canvasRef, ctxRef, setCanvasHeight,
        setCanvasWidth,canvasWidth, canvasHeight} = useContext(VideoContext)

    const drawFirstFrame = (videoElement) => {

        const dimensions = setDimensions(videoElement)
        videoElement.currentTime = 0;
        videoElement.addEventListener('seeked', () => {
            drawCanvas(videoElement, dimensions[0], dimensions[1]);
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

    function setDimensions(videoElement) {
        const div = document.getElementById('canvas-section');
        const divWidth = div.offsetWidth;
      
        const naturalVidHeight = videoElement.videoHeight;
        const naturalVidWidth = videoElement.videoWidth;
        let finalWidth, finalHeight;
    
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
        console.log(canvasWidth)
        console.log(canvasHeight)
       return [finalWidth, finalHeight];
      }

    return drawFirstFrame

}