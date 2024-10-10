import { useRef } from 'react';
import { useVideoContext } from '../Context/VideoContext';

const useResizeEffect = () => {
  const windowSize = useRef({ width: window.innerWidth, height: window.innerHeight });
  const { mainVideoCanvasRef, videoElement } = useVideoContext();

    const handleResize = () => {
      if (!videoElement) return;
        console.log('resized')
      if (window.innerWidth !== windowSize.current.width || window.innerHeight !== windowSize.current.height) {
        windowSize.current = { width: window.innerWidth, height: window.innerHeight };
        
        const canvas = mainVideoCanvasRef.current;
        const context = canvas.getContext("2d");
        const canvasContainer = document.getElementById("main-video-canvas-container");
        const containerWidth = canvasContainer.offsetWidth;
        const containerHeight = canvasContainer.offsetHeight;

        const videoWidth = videoElement.videoWidth;
        const videoHeight = videoElement.videoHeight;

        if (videoWidth && videoHeight) {
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
        } else {
          console.log("Video metadata not available yet");
        }
      }
    };

    window.addEventListener('resize', handleResize);

};

export default useResizeEffect;
