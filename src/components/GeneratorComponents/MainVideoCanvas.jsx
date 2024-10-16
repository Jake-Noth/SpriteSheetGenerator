import { useVideoContext } from "../../Context/VideoContext";

export default function MainVideoCanvas() {
    const { videoElement, mainVideoCanvasRef, sliderValue, videoFPS } = useVideoContext();

    const setCanvas = (canvas) => {
        if(canvas){
            if (mainVideoCanvasRef.current == null) {
                const context = canvas.getContext("2d");

                if(sliderValue == 0){
                    videoElement.currentTime = 0
                }else{
                    videoElement.currentTime = (sliderValue/videoFPS)
                }
                
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
                canvas = mainVideoCanvasRef.current
            }
        }
        
    };

    return <canvas id="main-video-canvas" ref={(el) => setCanvas(el)} />;
}
