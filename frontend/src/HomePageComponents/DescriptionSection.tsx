import { CSSProperties } from "react"
import DescriptionHeader from "./DescriptionHeader"
import DescriptionSection1 from "./DescriptionSection1"


export default function DescriptionSection() {

    const descriptionContainerStyles: CSSProperties = {
        height: "100%",
        width: "75%",
        backgroundColor: "green"
    }

    return (
        <div style={{ ...descriptionContainerStyles }}>
            <DescriptionHeader />
            <DescriptionSection1 />
            <DescriptionSection1 />
            <DescriptionSection1 />
        </div>
    )
}