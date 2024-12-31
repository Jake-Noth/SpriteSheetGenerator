import { useState } from "react"
import BackModal from "./BackModel"



export default function VideoAndBack(){

    const [showModal, setShowModal] = useState(false)

    const clearModal = () => {
        setShowModal(false)
    }

    const showTheModal = () => {
        setShowModal(true)
    }

    return(
        <div style={{height:"60%", width:"100%", background:"purple", paddingTop:"5%", paddingLeft:"5%"}}>
            <div
                style={{height:"15%", width:"20%", backgroundColor:"green"}}
                onClick={showTheModal}
            >
            </div>

            {showModal && <BackModal clearModal = {clearModal}/>}

        </div>
    )
}