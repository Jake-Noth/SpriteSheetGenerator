import { useState, useRef } from 'react';
import './index.css';

function App() {
  const [videoElement, setVideoElement] = useState(null);
  const [videoFPS, setVideoFPS] = useState('240');
  const [videoLength, setVideoLength] = useState(null);
  const [numFrames, setNumFrames] = useState(null);
  const [sliderNum, setSliderNum] = useState(0);
  const [frames, setFrames] = useState([])
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const setTheFile = (event) => {
    const file = event.target.files[0];
    setSliderNum(0);
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(file);
    setVideoElement(videoElement);

    videoElement.addEventListener('loadedmetadata', () => {
      setVideoLength(videoElement.duration);
      setNumFrames(videoElement.duration * videoFPS);
      videoElement.currentTime = 0;
    });

    drawFirstFrame(videoElement)
    
  };

  const drawFirstFrame = (videoElement) => {
    videoElement.currentTime = 0;
    videoElement.addEventListener('seeked', () => {
      drawCanvas(videoElement);
    });
  }

  const drawCanvas = (videoElement) => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctxRef.current = ctx;

      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
    } else {
      console.error("Canvas element not found.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const changeFPS = (event) => {
    setVideoFPS(event.target.value);
    setSliderNum(0);
    if (videoLength) {
      setNumFrames(event.target.value * videoLength);
    }
    
    {videoElement && drawFirstFrame(videoElement)}

  };

  const changeSliderNumber = (event) => {
    const value = event.target.value;
    setSliderNum(value);
    updateFrameOnSliderChange(value);
  };

  const updateFrameOnSliderChange = (sliderValue) => {
    const video = videoElement;
    if (video) {
      const durationPerFrame = video.duration / numFrames;
      const newTime = sliderValue * durationPerFrame;
      video.currentTime = newTime;
    }
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
      <h1 id="topHeader"></h1>
      <div id='form-content'>
        <form onSubmit={handleSubmit}>
          <input
            id="input"
            type='file'
            accept='video/*'
            onChange={setTheFile}
          />
        </form>
      </div>
      <div id="canvas-section">
        {videoElement && (
          <canvas id='video-canvas' ref={canvasRef}></canvas>
        )}
      </div>
      <div id='slider-section'>
        <h1 id='spacer'></h1>
        {numFrames && (
          <input
            onChange={changeSliderNumber}
            id='slider'
            type='range'
            min="0"
            max={numFrames}
            value={sliderNum}
          />
        )}
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