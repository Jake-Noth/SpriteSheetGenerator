import { useVideoContext } from "../Context/VideoContext"
import { useEffect } from "react"



export default function useResetCanvasRefs(){

    const {frameRefs, mainVideoCanvasRef} = useVideoContext()

    useEffect(() => {
        frameRefs.current = []
        mainVideoCanvasRef.current = null
        
    }, [frameRefs, mainVideoCanvasRef])
}