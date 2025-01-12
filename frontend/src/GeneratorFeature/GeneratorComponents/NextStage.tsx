import { useState } from "react"
import NextModal from "./NextModal"
import LoadingModal from "./LoadingModal"

export default function NextStage() {

    const [showNextModal, setShowNextModal] = useState(false)
    const [showLoadingModal, setShowLoadingModal] = useState(false)
    const [UUID, setUUID] = useState<string | null>(null);


    const showLoading = (UUID: string) => {
        setShowNextModal(false)
        setShowLoadingModal(true)
        setUUID(UUID)
    }


    return (
        <>
            <div id="next-stage" style={{ display: "flex", height: "10%", width: "100%", borderTop: "0.5px solid black", justifyContent: "center", alignItems: 'center' }}>
                <button onClick={() => setShowNextModal(true)} style={{ height: "50%", width: "75%", borderRadius: "20px", border: "0.5px solid black" }}>Next Stage</button>
            </div>

            {showNextModal && <NextModal closeModal={() => setShowNextModal(false)} showLoading={showLoading} />}

            {showLoadingModal && UUID && <LoadingModal UUID={UUID} />}
        </>
    )
}