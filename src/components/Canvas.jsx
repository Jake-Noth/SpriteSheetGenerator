import { useContext } from "react"
import { VideoContext } from "../context/Contex"

export default function Canvas(){

    const {canvasRef} = useContext(VideoContext)

    return(
        <canvas id='video-canvas' width={300} height={800} ref={canvasRef}></canvas>
    )
}