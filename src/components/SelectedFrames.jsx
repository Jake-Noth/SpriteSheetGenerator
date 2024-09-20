import { useContext, useRef, useEffect, useState } from "react";
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
                const canvasWidth = framesVideoElement.videoWidth / 2;
                const canvasHeight = canvasWidth / aspectRatio;

                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                const frame = frames[index];

                if (frame.value == null) {
                    framesVideoElement.currentTime = frame.frameFloat;

                    // Wait for the video to seek
                    await new Promise(resolve => {
                        const onSeeked = () => {
                            framesVideoElement.removeEventListener('seeked', onSeeked);
                            resolve();
                        };
                        framesVideoElement.addEventListener('seeked', onSeeked);
                    });

                    ctx.drawImage(framesVideoElement, 0, 0, canvasWidth, canvasHeight);
                    const dataURL = canvas.toDataURL('image/png');
                    
                    // Safely update the state by copying the array
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
        <div>
            {frames.map((frame, index) => (
                <canvas
                    key={index}
                    ref={el => canvasRefs.current[index] = el}
                    style={{ border: '1px solid black', margin: '10px' }}
                />
            ))}
        </div>
    );
}
