import { CSSProperties } from "react"
import Canvas from "./GeneratorComponents/Canvas"
import Header from "./GeneratorComponents/Header"
import SelectedFrames from "./GeneratorComponents/SelectedFrames"
import NextStage from "./GeneratorComponents/NextStage"
import SliderAndOptions from "./GeneratorComponents/SliderAndOptions"

export default function Generator() {

    const generatorContainerStyles: CSSProperties = {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f1f1f1"
    }

    const leftDivContainer: CSSProperties = {
        height: "100%",
        width: "60%",
        borderRight: "0.5px solid black"
    }

    const rightDivContainer: CSSProperties = {
        height: "100%",
        width: "40%",
        display: "flex",
        flexDirection: "column"
    }

    return (
        <div style={{ ...generatorContainerStyles }}>
            <div style={{ ...leftDivContainer }}>
                <Header />
                <Canvas />
                <SliderAndOptions />
            </div>

            <div style={{ ...rightDivContainer }}>
                <SelectedFrames />
                <NextStage />
            </div>
        </div>
    )
}