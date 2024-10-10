import { useVideoContext } from "../../Context/VideoContext"


export default function FileLoad(){

    const {setVideoElement, setVideoLength} = useVideoContext()

    const handleSubmit = (event) =>{
        const videoFile = event.target.files[0]
        if(videoFile){
            const videoURL = URL.createObjectURL(videoFile)
            const videoElement = document.createElement("video")
            videoElement.src = videoURL

            videoElement.onloadedmetadata = () => {
                setVideoElement(videoElement)
                setVideoLength(videoElement.duration)
            }
            
        }
    }

    return(
        <input id='video-upload-input' onChange={handleSubmit} type="file" accept="video/*"/>
    )
}