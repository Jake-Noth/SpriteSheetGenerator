import { CSSProperties } from "react";
import DescriptionSection from "./DescriptionSection";
import GeneratedSpritesSection from "./GeneratedSpritesSection";



export default function Home(){

    const homeContainerStyles: CSSProperties = {
        height:"100%", 
        width:"100%", 
        backgroundColor:'red', 
        display:"flex", 
        flexDirection:"row"
    }

    return(
       <div style={{...homeContainerStyles}}>
            <DescriptionSection/>
            <GeneratedSpritesSection/> 
       </div>
    )
}