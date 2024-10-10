import { useVideoContext } from "../../Context/VideoContext";

export default function MainVideoCanvas() {
    const { videoElement, mainVideoCanvasRef } = useVideoContext();

    const setCanvas = (canvas) => {
        if(canvas){
            if (mainVideoCanvasRef.current == null) {
                const context = canvas.getContext("2d");
                videoElement.currentTime = 0;   
                videoElement.onseeked = () => {
                    const canvasContainer = document.getElementById("main-video-canvas-container");
                    const containerWidth = canvasContainer.offsetWidth;
                    const containerHeight = canvasContainer.offsetHeight;
    
                    const videoWidth = videoElement.videoWidth;
                    const videoHeight = videoElement.videoHeight;
    
                    const aspectRatio = videoWidth / videoHeight;
                    let scaledWidth = containerWidth;
                    let scaledHeight = containerHeight;
    
                    if (containerWidth / containerHeight > aspectRatio) {
                        scaledHeight = containerHeight;
                        scaledWidth = scaledHeight * aspectRatio;
                    } else {
                        scaledWidth = containerWidth;
                        scaledHeight = scaledWidth / aspectRatio;
                    }
    
                    canvas.width = scaledWidth;
                    canvas.height = scaledHeight;
    
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(videoElement, 0, 0, scaledWidth, scaledHeight);
    
                    mainVideoCanvasRef.current = canvas;
    
                    videoElement.onseeked = null; 
                };
            }else{
                const oldCanvas = mainVideoCanvasRef.current
                const context = canvas.getContext("2d");
                canvas.width = oldCanvas.width
                canvas.height = oldCanvas.height
                //This redraw is required for when a different page is rendered and you come back to generator
                context.clearRect(0, 0, oldCanvas.width, oldCanvas.height);
                context.drawImage(videoElement, 0, 0, oldCanvas.width, oldCanvas.height);
            }
        }
        
    };

    return <canvas id="main-video-canvas" ref={(el) => setCanvas(el)} />;
}
