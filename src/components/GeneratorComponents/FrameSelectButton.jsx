import { useVideoContext } from "../../Context/VideoContext"


export default function FrameSelectButton(){

    const {setFrameTimes,frameTimes, sliderValue, videoFPS} = useVideoContext()

    const handleFrame = () => {

        const updatedFrameTimes = [...frameTimes]

        updatedFrameTimes.push(sliderValue/videoFPS)

        setFrameTimes(updatedFrameTimes)
        
    }



    return(
        <button onClick={handleFrame}>Select Frame</button>
    )
}