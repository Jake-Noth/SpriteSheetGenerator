import { useContext } from "react";
import { VideoContext } from "../context/Contex";

export default function Slider(){

    const {numFrames, sliderNum, setSliderNum, videoElement} = useContext(VideoContext)

    const changeSliderNumber = (event) => {
        const value = event.target.value;
        setSliderNum(value);
        updateFrameOnSliderChange(value);
      };

      const updateFrameOnSliderChange = (sliderValue) => {
        const video = videoElement;
        if (video) {
          const durationPerFrame = video.duration / numFrames;
          const newTime = sliderValue * durationPerFrame;
          video.currentTime = newTime;
        }
      };

    return (
        <input
            onChange={changeSliderNumber}
            id='slider'
            type='range'
            min="0"
            max={numFrames}
            value={sliderNum}
          />
    )
}