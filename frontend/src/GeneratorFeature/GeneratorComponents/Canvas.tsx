import { useDrawCanvasStore } from "../Stores/DrawCanvasStore";



export default function Canvas(){

    const {canvas, setCanvas, setCtx} = useDrawCanvasStore()

    const canvasCallbackRef = (canvasElement: HTMLCanvasElement | null) => {
        if (canvasElement && !canvas) {
            setCanvas(canvasElement);
            const ctx = canvasElement.getContext("2d", {willBeReadFrequently: true}) as CanvasRenderingContext2D
            if(ctx){
                setCtx(ctx)
            }
        }
    };

    return(
        <div style={{height:"70%", width:"100%"}}>
            <canvas ref={canvasCallbackRef} style={{ height: "100%", width: "100%", borderTop:"1px solid black", borderBottom:"1px solid black"}} />
        </div>
        
    )
}