import { useDrawCanvasStore } from "../Stores/DrawCanvasStore";



export default function Canvas(){

    const {canvas, setCanvas} = useDrawCanvasStore()

    const canvasCallbackRef = (canvasElement: HTMLCanvasElement | null) => {
        if (canvasElement && !canvas) {
            setCanvas(canvasElement);
        }
    };

    return(
        <div style={{height:"70%", width:"100%"}}>
            <canvas ref={canvasCallbackRef} style={{ height: "100%", width: "100%", borderTop:"1px solid black", borderBottom:"1px solid black"}} />
        </div>
        
    )
}