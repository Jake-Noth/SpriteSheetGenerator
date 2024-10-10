import { useVideoContext } from "../../Context/VideoContext"


export default function Slider(){

    const {videoLength, videoFPS, setSliderValue, videoElement, mainVideoCanvasRef, sliderValue} = useVideoContext()

    console.log(sliderValue)
    const changeSliderValue = (event) => {
        const newValue = event.target.value;
        videoElement.currentTime = newValue / videoFPS
        const canvas = mainVideoCanvasRef.current

        videoElement.onseeked = () => {
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            setSliderValue(newValue);
        }
        
    }

    return(
        <input type="range" onChange={changeSliderValue} value={sliderValue} min={0} max={videoLength * videoFPS}/>
    )
}