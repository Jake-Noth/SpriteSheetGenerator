import { useState } from "react"

export default function Options() {
  const [videoFPS, setVideoFPS] = useState(60);

  const handleFPSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFPS(Number(event.target.value));
  };

  return (
    <div style={{ height: "20%", width: "100%", backgroundColor: "yellow", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h3>Select Video FPS</h3>
      <div style={{ display: "flex", gap: "1rem" }}>
        <label>
          <input
            type="radio"
            name="fps"
            value="60"
            checked={videoFPS === 60}
            onChange={handleFPSChange}
          />
          60 FPS
        </label>
        <label>
          <input
            type="radio"
            name="fps"
            value="120"
            checked={videoFPS === 120}
            onChange={handleFPSChange}
          />
          120 FPS
        </label>
        <label>
          <input
            type="radio"
            name="fps"
            value="240"
            checked={videoFPS === 240}
            onChange={handleFPSChange}
          />
          240 FPS
        </label>
      </div>
    </div>
  );
}
