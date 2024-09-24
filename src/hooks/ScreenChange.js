import { useContext, useEffect } from 'react';
import useDrawFirstFrame from './DrawFirstFrame';
import { VideoContext } from '../context/Contex';

function useResizeHandler() {
  const { videoElement } = useContext(VideoContext);
  const drawFirstFrame = useDrawFirstFrame();  // Get drawFirstFrame function

  useEffect(() => {
    const handleResize = () => {
      if (videoElement) {
        drawFirstFrame(videoElement);  // Call drawFirstFrame on resize if videoElement exists
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [videoElement]);  // Re-run effect when videoElement changes
}

export default useResizeHandler;
