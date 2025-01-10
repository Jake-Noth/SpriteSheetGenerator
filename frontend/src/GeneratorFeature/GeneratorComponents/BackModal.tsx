import { CSSProperties } from "react"
import { usePageStore } from "../../PageSwitchStore";
import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

interface modalProps {
    clearModal: () => void
}

export default function BackModal(props:modalProps){

    const modalStyles:CSSProperties = {
        position:"fixed",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }

    const handleModalContentClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const {switchToHome} = usePageStore()
    
    const {resetSavedFrames} = useSaveCanvasStore()

    const switchToHomeAndReset = () =>{
        resetSavedFrames()
        switchToHome()
    }

    const openNewTab = () => {
        props.clearModal()
        const URL = window.location.href
        window.open(URL, '_blank')
    }

    return(
        <div 
            style={{...modalStyles}}
            onClick={props.clearModal}
        >
            <div style={{height:"20%", width:"35%", backgroundColor:"white", borderRadius:"25px", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}
            onClick={handleModalContentClick}>
                
                <div style={{height:"40%", width:"90%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    WARNING your progress will not be saved. Recommended approach is to reopen the page in a new tab to see the instructions.
                </div>
                
                <div style={{height:"25%", width:" 90%", display:"flex", justifyContent:"center", alignItems:"center", gap:"5%"}}>
                    <button onClick={switchToHomeAndReset} style={{ height: "100%", width: "30%", backgroundColor: "#FF9999", borderRadius: "10px" }}>Home</button> 
                    <button onClick={openNewTab} style={{ height: "100%", width: "30%", backgroundColor: "#90EE90", borderRadius: "10px" }}>New Tab</button>
                </div>
            </div>
        </div>
    )
}