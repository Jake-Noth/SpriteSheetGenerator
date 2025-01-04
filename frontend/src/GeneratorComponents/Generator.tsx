import { CSSProperties, useState } from "react"
import VideoAndBack from "./VideoAndBack"
import Options from "./Options"
import SliderAndCapture from "./SliderAndCapture"

export default function Generator(){

    const [FPS, setFPS] = useState(60)

    const generatorContainerStyles: CSSProperties = {
        height:"100%", 
        width:"100%", 
        backgroundColor:"red",
        display:"flex",
        flexDirection:"row"
    }

    const leftDivContainer: CSSProperties = {
        height:"100%", 
        width:"75%", 
        backgroundColor:"green"
    }

    const rightDivContainer: CSSProperties = {
        height:"100%", 
        width:"25%", 
        backgroundColor:"red"
    }

    return(
        <div style={{...generatorContainerStyles}}>
            <div style={{...leftDivContainer}}>
                <VideoAndBack/>
                <Options setFPS={setFPS} FPS={FPS}/>
                <SliderAndCapture FPS={FPS}/>
            </div>

            <div style={{...rightDivContainer}}>

            </div>
        </div>
    )
}