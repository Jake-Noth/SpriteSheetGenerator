import { useContext, useRef, useEffect } from "react";
import { VideoContext } from "../context/Contex";
import { debounce } from "lodash";

export default function SelectedFrames() {
    const { frames, setFrames, framesVideoElement, canvasHeight, canvasWidth } = useContext(VideoContext);
    const canvasRefs = useRef([]);

    const drawFrame = async (index) => {
        const canvas = canvasRefs.current[index];
        if (canvas) {
            const ctx = canvas.getContext('2d');

            const aspectRatio = canvasWidth / canvasHeight;
            const scaledDownCanvasWidth = canvasWidth / 2;
            const scaledDownCanvasHeight = scaledDownCanvasWidth / aspectRatio;

            // Set canvas size
            canvas.width = scaledDownCanvasWidth;
            canvas.height = scaledDownCanvasHeight;

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

                ctx.drawImage(framesVideoElement, 0, 0, scaledDownCanvasWidth, scaledDownCanvasHeight);
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
                    ctx.drawImage(img, 0, 0, scaledDownCanvasWidth, scaledDownCanvasHeight);
                };
            }
        }
    };

    // Debounced function to draw frames
    const debouncedDrawFrames = debounce(() => {
        canvasRefs.current.forEach((_, index) => {
            drawFrame(index);
        });
    }, 200); // Adjust the delay as needed

    useEffect(() => {
        debouncedDrawFrames();
    }, [frames, framesVideoElement, canvasHeight, canvasWidth]);

    return (
        <div id='frames-container'>
            {frames.map((frame, index) => (
                <div id='frame' key={index}>
                    <canvas
                        ref={el => canvasRefs.current[index] = el}
                    />
                </div>
            ))}
        </div>
    );
}
