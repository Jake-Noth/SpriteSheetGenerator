import { useContext } from "react"
import { VideoContext } from "../context/Contex"


export default function ResetButton(){

    const {setFrames, setCanvasRefs} = useContext(VideoContext)

    const resetFrames = () => {
        setFrames([])
        setCanvasRefs([])
    }

    return(
        <button id='reset-frame-button'onClick={resetFrames}>Reset</button>
    )
}