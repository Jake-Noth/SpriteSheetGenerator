
import React, { createContext, useState, useRef } from 'react';

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoElement, setVideoElement] = useState(null);
  const [framesVideoElement, setFramesVideoElement] = useState(null)
  const [videoFPS, setVideoFPS] = useState(240);
  const [videoLength, setVideoLength] = useState(null);
  const [numFrames, setNumFrames] = useState(null);
  const [sliderNum, setSliderNum] = useState(0);
  const [frames, setFrames] = useState([]);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [canvasHeight, setCanvasHeight] = useState(null)
  const [canvasWidth, setCanvasWidth] = useState(null)
  const [orderByTime, setOrderByTime] = useState(true)

  const value = {
    videoElement,
    setVideoElement,
    framesVideoElement,
    setFramesVideoElement,
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
    ctxRef,
    setCanvasHeight,
    setCanvasWidth,
    canvasHeight,
    canvasWidth,
    orderByTime, 
    setOrderByTime
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
