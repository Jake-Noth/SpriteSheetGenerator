import { useState, useRef, createContext, useContext } from 'react';
import './index.css';
import FileLoad from './components/FileLoad';
import { VideoContext } from './context/Contex';
import Canvas from './components/Canvas';
import Slider from './components/Slider';

function App() {
  
  const {
    videoElement,
    setVideoElement,
    videoFPS,
    setVideoFPS,
    videoLength,
    setVideoLength,
    numFrames,
    setNumFrames,
    sliderNum,
    setSliderNum,
    frames,
    setFrames,
    canvasRef,
    ctxRef
  } = useContext(VideoContext);


  const changeFPS = (event) => {
    setVideoFPS(event.target.value);
    setSliderNum(0);
    if (videoLength) {
      setNumFrames(event.target.value * videoLength);
    }
    
    {videoElement && drawFirstFrame(videoElement)}

  };

  

  const selectFrame = () => {

    const durationPerFrame = videoElement.duration / numFrames;
    const frameTime = sliderNum * durationPerFrame;
    const frameFloat = parseFloat(frameTime)
    let newFrames = [...frames, frameFloat]
    newFrames.sort((a, b) => a - b)
    setFrames(newFrames)

  }

  return (
    <>
      <h1 id="topHeader">Sprite Gen</h1>
      <FileLoad/>
      <div id="canvas-section">
        {videoElement && <Canvas/>}
      </div>
      <div id='slider-section'>
        <h1 id='spacer'></h1>
        {numFrames && <Slider/>}
        {videoElement && <button onClick={selectFrame} id='keyframe-button'>Select Keyframe</button>}
      </div>

      <div id="options">
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'>
        <fieldset id='field-set'>
          <legend>Select the fps of the video selected</legend>
            <div>
              <input 
                type='radio'
                id='240' 
                name='fps' 
                value='240'
                checked={videoFPS === '240'}
                onChange={changeFPS}
              />
              <label htmlFor='240'>240</label>
            </div>
            <div>
              <input 
                type='radio' 
                id='120' 
                name='fps'
                value='120'
                checked={videoFPS === '120'}
                onChange={changeFPS}
              />
              <label htmlFor='120'>120</label>
            </div>
            <div>
              <input 
                type='radio' 
                id='60' 
                name='fps'
                value='60'
                checked={videoFPS === '60'}
                onChange={changeFPS}
              />
              <label htmlFor='60'>60</label>
            </div>
        </fieldset>
        </div>
      </div>
    </>
  );
}

export default App;