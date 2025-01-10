import { useState } from "react"
import NextModal from "./NextModal"

export default function NextStage() {

    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <div id="next-stage" style={{ display: "flex", height: "10%", width: "100%", borderTop: "0.5px solid black", justifyContent: "center", alignItems: 'center' }}>
                <button onClick={() => setShowModal(true)} style={{ height: "50%", width: "75%", borderRadius: "20px" }}>Next Stage</button>
            </div>

            {showModal && <NextModal closeModal={() => setShowModal(false)} />}
        </>
    )
}