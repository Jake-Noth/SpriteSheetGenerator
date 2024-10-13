import { useVideoContext } from "../../Context/VideoContext"


export default function SelectedFrames(){

    const {frameTimes} = useVideoContext()

    if (frameTimes.length > 0) {
        frameTimes.forEach((element) => {
          console.log(element);
        });
      }
    
    
    return(
        <></>
    )
}