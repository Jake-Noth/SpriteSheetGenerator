import { CSSProperties } from "react"

interface LoadingModal {
    UUID: string
}


export default function LoadingModal(props: LoadingModal) {



    const loadingStyles: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    }


    console.log(props.UUID)

    return (
        <div style={{ ...loadingStyles }}></div>
    )
}