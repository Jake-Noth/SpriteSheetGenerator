import { useContext } from "react";
import { VideoContext } from "../context/Contex";
import useDrawFirstFrame from "../hooks/DrawFirstFrame";


export default function FPSButtons(){
    
    const FPSOptions = [240, 120, 60]

    const {setVideoFPS, setSliderNum, setNumFrames, videoElement, videoFPS, videoLength} = useContext(VideoContext)

    const drawFirstFrame = useDrawFirstFrame()

    const changeFPS = (event) => {
        setVideoFPS(event.target.value);
        setSliderNum(0);
        if (videoLength) {
          setNumFrames(event.target.value * videoLength);
        }
        
        {videoElement && drawFirstFrame(videoElement)}
    
      };

    const radioButton = (FPS) => {
        return(
            <div key ={FPS}>
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
        )
    }
    
    return(
        <fieldset id='field-set'>
          <legend>Select the fps of the video selected</legend>
            {FPSOptions.map((FPS) => radioButton(FPS))}
        </fieldset>
    )
}