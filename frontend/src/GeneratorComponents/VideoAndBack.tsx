import { useRef, useState } from "react"
import BackModal from "./BackModel"
import { drawFrame } from "./frameDrawer";



export default function VideoAndBack(){

    const [showModal, setShowModal] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const hideModal = () => {
        setShowModal(false)
    }

    const showTheModal = () => {
        setShowModal(true)
    }

    const handleFile = (event:React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if(file){

            const fileObj = URL.createObjectURL(file)

            setFileName(file.name)

            if(canvasRef.current){
                drawFrame(fileObj, 0, canvasRef.current)
            }
        }
    }


    return(
        <div style={{height:"60%", width:"100%", background:"purple", display:"flex", flexDirection:"column"}}>
            <div style={{height:"10%", width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

                <button
                    style={{height:"100%", width:"20%", backgroundColor:"green"}}
                    onClick={showTheModal}
                >
                    Back
                </button>

                <div style={{height:"100%", width:"20%", display:"flex", alignItems:"end", justifyContent:"center"}}>
                    {fileName ? fileName : "No Video Selected"}
                </div>

                <label 
                    htmlFor="videoUpload" 
                    className="upload-label" 
                    style={{border:"2px solid black", 
                    width:"20%", 
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center", 
                    marginTop:"1%", 
                    marginBottom:"1%"}}
                >
                    {fileName ? "Change Video" : "Upload Video"}
                </label>
                <input
                    type="file"
                    id="videoUpload"
                    name="videoUpload"
                    accept="video/*"
                    onChange={handleFile}
                    style={{ display: "none" }}
                />

            </div>
            

            <canvas ref={canvasRef} style={{height:"90%", width:"100%", border:"2px solid black"}}/>

            {showModal && <BackModal clearModal = {hideModal}/>}

        </div>
    )
}