import { useState } from "react";
import FramePreviewModal from "./FramePreviewModal";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

export default function Options() {

  const [previewModal, setPreviewModal] = useState(false)

  const {savedFrames} = useSaveCanvasStore()


  const showPreviewModal = () => {
    setPreviewModal(true)
  }

  const hidePreviewModal = () => {
    setPreviewModal(false)
  }

  return (
    <div style={{ height: "2%", width: "100%", display: "flex", flexDirection: "row", justifyContent:"end", alignItems:"start", paddingRight:"1%"}}>
          {Object.values(savedFrames).length > 0 && <button onClick={showPreviewModal}>Preview Frames</button>}
          {previewModal ? <FramePreviewModal exitModal={hidePreviewModal}/> : null}
    </div>
  );
}
