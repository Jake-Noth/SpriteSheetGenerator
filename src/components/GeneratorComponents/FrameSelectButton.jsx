import { useVideoContext } from "../../Context/VideoContext"


export default function FrameSelectButton(){

    const {frameRefs, setFrames,frames, sliderValue} = useVideoContext()

    const handleFrame = () => {

        
    }



    return(
        <button onClick={handleFrame}>Select Frame</button>
    )
}