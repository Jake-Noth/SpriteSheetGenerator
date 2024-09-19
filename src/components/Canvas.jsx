import { useContext } from "react"
import { VideoContext } from "../context/Contex"



export default function Canvas(){

    const {canvasRef} = useContext(VideoContext)

    return(
        <canvas id='video-canvas' ref={canvasRef}></canvas>
    )
}