import { useContext, useRef, useEffect } from "react";
import { VideoContext } from "../context/Contex";

export default function SelectedFrames() {
    const { frames, setFrames, framesVideoElement } = useContext(VideoContext);
    const canvasRefs = useRef([]);

    useEffect(() => {
        const drawFrame = async (index) => {
            const canvas = canvasRefs.current[index];
            if (canvas) {
                const ctx = canvas.getContext('2d');
                const aspectRatio = framesVideoElement.videoWidth / framesVideoElement.videoHeight;
                const canvasWidth = framesVideoElement.videoWidth / 10;
                const canvasHeight = canvasWidth / aspectRatio;

                // Set canvas size
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                // Log sizes for debugging
                console.log(`Canvas ${index} - Width: ${canvasWidth}, Height: ${canvasHeight}`);

                const frame = frames[index];

                if (frame.value == null) {
                    framesVideoElement.currentTime = frame.frameFloat;
                    await new Promise(resolve => {
                        const onSeeked = () => {
                            framesVideoElement.removeEventListener('seeked', onSeeked);
                            resolve();
                        };
                        framesVideoElement.addEventListener('seeked', onSeeked);
                    });

                    ctx.drawImage(framesVideoElement, 0, 0, canvasWidth, canvasHeight);
                    const dataURL = canvas.toDataURL('image/png');
                    
                    setFrames(prevFrames => {
                        const updatedFrames = [...prevFrames];
                        updatedFrames[index] = { ...updatedFrames[index], value: dataURL };
                        return updatedFrames;
                    });
                } else {
                    const img = new Image();
                    img.src = frame.value;
                    img.onload = () => {
                        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                    };
                }
            }
        };

        canvasRefs.current.forEach((_, index) => {
            drawFrame(index);
        });
    }, [frames, framesVideoElement]);

    return (
        <div id='frames'>
            {frames.map((frame, index) => (
                <canvas
                    key={index}
                    ref={el => canvasRefs.current[index] = el}
                />
            ))}
        </div>
    );
}
