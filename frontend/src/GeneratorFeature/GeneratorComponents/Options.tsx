import { useState } from "react";
import { useDrawCanvasStore } from "../Stores/DrawCanvasStore";
import { drawFrame } from "../frameDrawer";
import FramePreviewModal from "./FramePreviewModal";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

interface OptionsProps {
  setFPS : React.Dispatch<React.SetStateAction<number>>
  FPS: number
}

export default function Options(props: OptionsProps) {

  const [previewModal, setPreviewModal] = useState(false)

  const {video, canvas, slider} = useDrawCanvasStore()

  const {savedFrames} = useSaveCanvasStore()

  const handleFPSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFPS(Number(event.target.value));

    if(video && canvas && slider){
      drawFrame(video, 0, canvas)
      slider.value = "0"
    }
  };

  const showPreviewModal = () => {
    setPreviewModal(true)
  }

  const hidePreviewModal = () => {
    setPreviewModal(false)
  }

  return (
    <div style={{ height: "10%", width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
      <div style={{height:"100%", width:"50%"}}>
        <h3>Select Video FPS</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <label>
            <input
              type="radio"
              name="fps"
              value="60"
              checked={props.FPS === 60}
              onChange={handleFPSChange}
            />
            60 FPS
          </label>
          <label>
            <input
              type="radio"
              name="fps"
              value="120"
              checked={props.FPS === 120}
              onChange={handleFPSChange}
            />
            120 FPS
          </label>
          <label>
            <input
              type="radio"
              name="fps"
              value="240"
              checked={props.FPS === 240}
              onChange={handleFPSChange}
            />
            240 FPS
          </label>
        </div>
      </div>
      <div style={{height:"100%", width:"50%"}}>
          {Object.values(savedFrames).length > 0 && <button onClick={showPreviewModal}>Preview Frames</button>}
          {previewModal ? <FramePreviewModal exitModal={hidePreviewModal}/> : null}
      </div>
    </div>
  );
}
