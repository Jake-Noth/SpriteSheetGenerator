import { CSSProperties } from "react"
import { usePageStore } from "../PageSwitchStore"

export default function DescriptionHeader() {

    const { switchToGeneratorPage } = usePageStore()

    const headerContainerStyles: CSSProperties = {
        height: "10%",
        width: "100%",
        backgroundColor: "red",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "5%",
        paddingLeft: "3%"
    }

    const labelContainerStyles: CSSProperties = {
        fontSize: "25px"
    }

    const tryGeneratorButtonStyles: CSSProperties = {
        height: "50%",
        width: "20%",
        backgroundColor: "orange",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
        cursor: "pointer",
        fontSize: "clamp(5px, 2vw, 25px)"
    }

    return (
        <div style={{ ...headerContainerStyles }}>

            <div style={{ ...labelContainerStyles }}>Sprite Generator</div>

            <div
                style={{ ...tryGeneratorButtonStyles }}
                onClick={switchToGeneratorPage}
            >
                Use Generator
            </div>
        </div>
    )
}