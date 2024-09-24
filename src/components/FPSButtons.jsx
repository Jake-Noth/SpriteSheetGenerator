import { useContext } from "react";
import { VideoContext } from "../context/Contex";
import useDrawFirstFrame from "../hooks/DrawFirstFrame";

export default function FPSButtons(){
    
    const FPSOptions = [240, 120, 60];

    const { setVideoFPS, setSliderNum, setNumFrames, videoElement, videoFPS, videoLength, canvasHeight,
      canvasWidth } = useContext(VideoContext);

    const drawFirstFrame = useDrawFirstFrame();

    const changeFPS = (event) => {
        const selectedFPS = parseInt(event.target.value, 10);
        setVideoFPS(selectedFPS);
        setSliderNum(0);
        if (videoLength) {
          setNumFrames(selectedFPS * videoLength);
        }
        
        if (videoElement) {
          drawFirstFrame(videoElement, canvasWidth, canvasHeight);
        }
      };

    const radioButton = (FPS) => {
        return (
            <div key={FPS}>
              <input 
                type='radio'
                id={FPS} 
                name='fps' 
                value={FPS} 
                checked={videoFPS === FPS}
                onChange={changeFPS}
              />
              <label htmlFor={FPS}>{FPS}</label>
            </div>
        );
    };
    
    return (
        <fieldset id='field-set'>
          <legend>Select the fps of the video selected</legend>
            {FPSOptions.map((FPS) => radioButton(FPS))}
        </fieldset>
    );
}