import { useContext } from 'react';
import './index.css';
import FileLoad from './components/FileLoad';
import { VideoContext } from './context/Contex';
import Canvas from './components/Canvas';
import Slider from './components/Slider';
import KeyFrameButton from './components/KeyFrameButton';
import FPSButtons from './components/FPSButtons';

function App() {
  
  const {videoElement} = useContext(VideoContext);

  return (
    <>
      <h1 id="topHeader">Sprite Gen</h1>

      <FileLoad/>

      <div id="canvas-section">
        {videoElement && <Canvas/>}
      </div>

      <div id='slider-section'>
        <h1 id='spacer'></h1>
        {videoElement && <Slider/>}
        {videoElement && <KeyFrameButton/>}
      </div>

      <div id="options">
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'>
          <FPSButtons/>
        </div>
      </div>
    </>
  );
}

export default App;