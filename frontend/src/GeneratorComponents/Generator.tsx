import { CSSProperties } from "react"
import VideoAndBack from "./VideoAndBack"
import Options from "./Options"
import SliderAndCapture from "./SliderAndCapture"

export default function Generator(){

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
                <Options/>
                <SliderAndCapture/>
            </div>

            <div style={{...rightDivContainer}}>

            </div>
        </div>
    )
}