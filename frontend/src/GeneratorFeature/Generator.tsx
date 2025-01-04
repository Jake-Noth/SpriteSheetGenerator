import { CSSProperties, useState } from "react"
import Options from "./GeneratorComponents/Options"
import SliderAndCapture from "./GeneratorComponents/SliderAndCapture"
import Canvas from "./GeneratorComponents/Canvas"
import Header from "./GeneratorComponents/Header"
import SelectedFrames from "./GeneratorComponents/SelectedFrames"

export default function Generator(){

    const [FPS, setFPS] = useState(60)

    const generatorContainerStyles: CSSProperties = {
        height:"100%", 
        width:"100%", 
        display:"flex",
        flexDirection:"row",
        backgroundColor:"green"
    }

    const leftDivContainer: CSSProperties = {
        height:"100%", 
        width:"75%",
        border:"1px solid black"
        
    }

    const rightDivContainer: CSSProperties = {
        height:"100%", 
        width:"25%",
        border:"1px solid black"
    }

    return(
        <div style={{...generatorContainerStyles}}>
            <div style={{...leftDivContainer}}>
                <Header/>
                <Canvas/>
                <Options setFPS={setFPS} FPS={FPS}/>
                <SliderAndCapture FPS={FPS}/>
            </div>

            <div style={{...rightDivContainer}}>
                <SelectedFrames/>
            </div>
        </div>
    )
}