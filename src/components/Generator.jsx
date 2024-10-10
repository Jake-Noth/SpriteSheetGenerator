import { useVideoContext } from "../Context/VideoContext";
import FileLoad from "./GeneratorComponents/FileLoad";
import MainVideoCanvas from "./GeneratorComponents/MainVideoCanvas";
import Slider from "./GeneratorComponents/Slider";

export default function Generator(){

    const {videoElement} = useVideoContext()
    

    return(
            <div id="generator-container">
                <div id='canvas-and-modifiers-container'>
                
                    <div id='main-video-canvas-container'>
                        {videoElement && <MainVideoCanvas/>}
                    </div>
                    
                    <div id='modifiers-container'>
                        <div id='slider-and-frame-button-container'>

                            <div id='slider-container'>
                                {videoElement && <Slider/>}
                            </div>

                            <div id='keyframe-button-container'>
                                
                            </div> 
                        </div>

                        <div id='modifier-buttons-container'>
                        
                        </div>

                        <div id='submit-button-container'>

                        </div>
                    </div>
                </div>
                
                <div id='frames-and-upload-container'>

                    <div id='file-upload-container'>
                        <FileLoad/>
                    </div>
                    
                    <div id='reset-button-container'>
                    
                    </div>
                </div>
            </div>
    )
}