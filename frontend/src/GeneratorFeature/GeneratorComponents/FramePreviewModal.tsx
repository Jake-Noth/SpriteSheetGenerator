import { CSSProperties, useEffect, useRef, useState } from "react"
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore"

interface FramePreviewModalProps {
    exitModal: () => void
}

export default function FramePreviewModal(props:FramePreviewModalProps){

    const [framesReady, setFramesReady] = useState(false)
    const framesArrayRef = useRef<HTMLImageElement[]>([])
    const timeOutRef = useRef<number | null>(null)
    const intervalRef = useRef<number | null>(null)
    const [FPS, setFPS] = useState<number>(10)
    const [intervalCycle, setIntervalCycle] = useState(1000)

    const {savedFrames} = useSaveCanvasStore()    

    const loadFrames = Object.values(savedFrames).map((dataUrl) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    });

    if(framesArrayRef.current.length === 0){
        framesArrayRef.current = []
        Promise.all(loadFrames)
        .then((images) => {
            framesArrayRef.current.push(...images)
            setFramesReady(true)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
        if (framesReady) {
            if (canvas) {
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                const frameWidth = framesArrayRef.current[0].width/1.7;
                const frameHeight = framesArrayRef.current[0].height/1.7;
                canvas.width = frameWidth;
                canvas.height = frameHeight;
    
                let currentFrameIndex = 0;
                const frameTime = 1000/FPS
                
                const cycleAndRenderFrames = () => {
                    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                    const currentFrame = framesArrayRef.current[currentFrameIndex];
                    ctx.drawImage(currentFrame, 0, 0, frameWidth, frameHeight);
                    currentFrameIndex = (currentFrameIndex + 1) % framesArrayRef.current.length;

                    
                    if(currentFrameIndex === 0){
                        if(timeOutRef.current)
                        clearTimeout(timeOutRef.current)
                        timeOutRef.current = setTimeout(() => {ctx.drawImage(framesArrayRef.current[0], 0, 0, canvas.width, canvas.height)}, frameTime)
                        return
                    }

                    timeOutRef.current = setTimeout(cycleAndRenderFrames, frameTime)
                };
                
                cycleAndRenderFrames()
                intervalRef.current = setInterval(cycleAndRenderFrames, (frameTime * framesArrayRef.current.length)+ intervalCycle + frameTime)

            }
        }
    };

    const alterFPS = (event:React.ChangeEvent<HTMLInputElement>) =>{

        if(timeOutRef.current)
            clearTimeout(timeOutRef.current)

        if(intervalRef.current)
            clearInterval(intervalRef.current)

        event.target.value === "" ? setFPS(1) : setFPS(Number(event.target.value))
    }

    const alterIntervalCycle = (event:React.ChangeEvent<HTMLInputElement>) =>{

        if(timeOutRef.current)
            clearTimeout(timeOutRef.current)

        if(intervalRef.current)
            clearInterval(intervalRef.current)

        event.target.value === "" ? setIntervalCycle(1000) : setIntervalCycle(Number(event.target.value))
    }

    useEffect(()=>{

        return () =>{

            if(timeOutRef.current)
            clearTimeout(timeOutRef.current)

            if(intervalRef.current)
            clearInterval(intervalRef.current)
        }
        
    },[])

    const modalStyles: CSSProperties= {
        position:"fixed",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        gap:"1%"
    }

    return(
        <div style={{...modalStyles}} onClick={props.exitModal}>

            <canvas style={{borderRadius:"20px"}} ref={handleCanvasRef} />
            <div onClick={(event:React.MouseEvent) => event.stopPropagation()} style={{display:"flex", flexDirection:"row",justifyContent:"center", backgroundColor:"white", width:"8%", borderRadius:"15px", gap:"5%"}}>
                FPS: <input style={{border:"none", width:"25%", fontSize:"15px"}} defaultValue={FPS} type="number" onChange={alterFPS}/>
            </div>
            <div onClick={(event:React.MouseEvent) => event.stopPropagation()} style={{display:"flex", flexDirection:"row",justifyContent:"center", backgroundColor:"white", width:"13%", borderRadius:"15px", gap:"1%"}}>
                Interval Cycle ms: <input style={{border:"none", width:"25%", fontSize:"15px"}} defaultValue={intervalCycle} type="number" onChange={alterIntervalCycle}/>
            </div>
            
        </div>
    )
}