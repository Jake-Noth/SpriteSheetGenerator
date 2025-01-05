import { useEffect, useRef, useState } from "react";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

type SavedFrames = Record<number, string>;

export default function FramePreview() {
  const { savedFrames } = useSaveCanvasStore() as { savedFrames: SavedFrames };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [fps, setFps] = useState<number>(10); // Default FPS
  const [fpsInput, setFpsInput] = useState<string>("10"); // Input string for the FPS field

  useEffect(() => {
    if (!canvasRef.current || Object.keys(savedFrames).length === 0) return;

    // Set canvas size based on the first frame's dimensions
    const firstFrameTime = Object.keys(savedFrames)[0];
    const firstImageDataUrl = savedFrames[Number(firstFrameTime)];
    const img = new Image();

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const container = canvasRef.current?.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        if (containerWidth / containerHeight > aspectRatio) {
          setCanvasSize({
            width: containerHeight * aspectRatio,
            height: containerHeight,
          });
        } else {
          setCanvasSize({
            width: containerWidth,
            height: containerWidth / aspectRatio,
          });
        }
      }
    };

    img.src = firstImageDataUrl;
  }, [savedFrames]);

  useEffect(() => {
    if (!isPlaying || !canvasRef.current || Object.keys(savedFrames).length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameTimes = Object.keys(savedFrames)
      .map(Number)
      .sort((a, b) => a - b);

    let frameIndex = 0;
    const interval = setInterval(() => {
      const frameTime = frameTimes[frameIndex];
      const imageDataUrl = savedFrames[frameTime];
      const img = new Image();

      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      img.src = imageDataUrl;

      frameIndex = (frameIndex + 1) % frameTimes.length;
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [savedFrames, isPlaying, fps]);

  const handleFpsChange = (value: string) => {
    setFpsInput(value);
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setFps(parsedValue);
    }
  };

  return (
    <div
      id="wtf"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

        <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
            <button onClick={() => setIsPlaying(!isPlaying)} style={{ marginRight: "10px" }}>
            {isPlaying ? "Pause" : "Play"}
            </button>
            <label>
                FPS:
                <input
                    type="text"
                    value={fpsInput}
                    onChange={(e) => handleFpsChange(e.target.value)}
                    style={{ marginLeft: "5px", width: "50px" }}
                />
            </label>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          border: "1px solid black",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
}
