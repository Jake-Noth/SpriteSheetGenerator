import { useDrawCanvasStore } from "../Stores/DrawCanvasStore";
import { drawFrame } from "../frameDrawer";
import FramePreview from "./FramePreview";

interface OptionsProps {
  setFPS : React.Dispatch<React.SetStateAction<number>>
  FPS: number
}

export default function Options(props: OptionsProps) {
  
  console.log('parent')

  const {video, canvas, slider} = useDrawCanvasStore()

  const handleFPSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFPS(Number(event.target.value));

    if(video && canvas && slider){
      drawFrame(video, 0, canvas)
      slider.value = "0"
    }
  };

  return (
    <div style={{ height: "20%", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
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
        <FramePreview/>
      </div>
    </div>
  );
}
