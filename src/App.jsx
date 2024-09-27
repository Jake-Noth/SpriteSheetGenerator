import { useContext } from 'react';
import './index.css';
import FileLoad from './components/FileLoad';
import { VideoContext } from './context/Contex';
import Canvas from './components/Canvas';
import Slider from './components/Slider';
import KeyFrameButton from './components/KeyFrameButton';
import FPSButtons from './components/FPSButtons';
import SelectedFrames from './components/SelectedFrames';
import useResizeHandler from './hooks/ScreenChange';
import SortFrameByTime from './components/FrameSortButton';
import ResetButton from './components/ResetButton';

function App() {
  const { videoElement, frames } = useContext(VideoContext);
  useResizeHandler();

  return (
    <>
      <h1 id="topHeader">Sprite Gen</h1>
        
      <div id="canvas-and-frames">
        <div id='canvas-section-and-modifiers'>
          
          <div id='canvas-section'>
            {videoElement && <Canvas/>}
          </div>
          
          <div id='modifiers-container'>
            <div id='slider-and-frame-button-container'>
              <div id='slider-container'>
                {videoElement && <Slider/>}
              </div>

              <div id='frame-button-container'>
                {videoElement && <KeyFrameButton/>}
              </div> 
            </div>

            <div id='modifier-buttons-container'>
              <FPSButtons/>
              <SortFrameByTime/>
            </div>

            <div id='submit-button-container'>

            </div>
            
              
  
          </div>
        </div>
        
        <div id='frames-and-upload-section'>
          <div id='file-upload-container'>
            <FileLoad/>
          </div>

          <SelectedFrames/>
          
          <div id='reset-button-div'>
            <ResetButton/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;