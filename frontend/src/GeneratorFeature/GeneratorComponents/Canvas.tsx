import { useDrawCanvasStore } from "../DrawCanvasStore";



export default function Canvas(){

    const {canvas, setCanvas} = useDrawCanvasStore()

    const canvasCallbackRef = (canvasElement: HTMLCanvasElement | null) => {
        if (canvasElement && !canvas) {
            setCanvas(canvasElement);
        }
    };

    return(
        <div style={{height:"50%", width:"100%"}}>
            <canvas ref={canvasCallbackRef} style={{ height: "100%", width: "100%", border:"1px solid black"}} />
        </div>
        
    )
}