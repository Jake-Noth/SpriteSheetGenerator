import { useVideoContext } from "../Context/VideoContext"
import { useEffect } from "react"



export default function useResetCanvasRefs(){

    const {setFrameTimes, mainVideoCanvasRef} = useVideoContext()

    useEffect(() => {
        setFrameTimes([])
        mainVideoCanvasRef.current = null
        
    }, [setFrameTimes, mainVideoCanvasRef])
}