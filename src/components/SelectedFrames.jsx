import { useContext, useRef, useEffect, useState } from "react";
import { VideoContext } from "../context/Contex";
import { debounce } from "lodash";

export default function SelectedFrames() {
    const { frames, setFrames, framesVideoElement, canvasHeight, canvasWidth } = useContext(VideoContext);
    const canvasRefs = useRef([]);
    const [loadedFrames, setLoadedFrames] = useState([]); // Track which frames are loaded

    const drawFrame = async (index) => {
        const canvas = canvasRefs.current[index];
        if (canvas) {
            const ctx = canvas.getContext('2d');

            const aspectRatio = canvasWidth / canvasHeight;
            const scaledDownCanvasWidth = canvasWidth / 2;
            const scaledDownCanvasHeight = scaledDownCanvasWidth / aspectRatio;

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

            setLoadedFrames(prev => {
                const updatedLoadedFrames = [...prev];
                updatedLoadedFrames[index] = true;
                return updatedLoadedFrames;
            });
        }
    };

    const deleteFrame = (index => {
        const newFrames = [...frames];
        newFrames.splice(index, 1);
        setFrames(newFrames);
        setLoadedFrames(prev => prev.filter((_, i) => i !== index)); // Remove loaded status for deleted frame
    });

    const debouncedDrawFrames = debounce(() => {
        canvasRefs.current.forEach((_, index) => {
            drawFrame(index);
        });
    }, 200);

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
                    {loadedFrames[index] && (
                        <>
                            <button id='frame-button' onClick={() => deleteFrame(index)}></button>
                            <span id='frame-button-time'>
                                {Number(frame.frameFloat.toFixed(1))} Seconds
                            </span>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
