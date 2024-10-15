import { useVideoContext } from "../Context/VideoContext";
import useResizeEffect from "../CustomHooks/HandleResize";
import FileLoad from "./GeneratorComponents/FileLoad";
import FpsButtons from "./GeneratorComponents/FpsButtons";
import FrameSelectButton from "./GeneratorComponents/FrameSelectButton";
import MainVideoCanvas from "./GeneratorComponents/MainVideoCanvas";
import SelectedFrames from "./GeneratorComponents/SelectedFrames";
import Slider from "./GeneratorComponents/Slider";

export default function Generator(){

    const {videoElement} = useVideoContext()
    useResizeEffect()
    

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
                                <FrameSelectButton/>
                            </div> 
                        </div>

                        <div id='modifier-buttons-container'>
                            <div id='fps-container' className="modifier-button-container">
                                <div id='fps-notes'>
                                    <h3>Set your video's fps</h3>
                                    <h5>Note: The higher your videos fps the more keyframes to choose from</h5>
                                </div>
                                <FpsButtons/>
                            </div>
                            <div className="modifier-button-container"></div>
                            <div className="modifier-button-container"></div>
                        </div>

                        <div id='submit-button-container'>

                        </div>
                    </div>
                </div>
                
                <div id='frames-and-upload-container'>

                    <div id='file-upload-container'>
                        <FileLoad/>
                    </div>

                    <div id = 'frames-container'>
                        <SelectedFrames/>
                    </div>
                        
                    <div id='reset-button-container'>
                    
                    </div>
                </div>
            </div>
    )
}