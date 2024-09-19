import React, { createContext, useState, useRef } from 'react';

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoElement, setVideoElement] = useState(null);
  const [videoFPS, setVideoFPS] = useState('240');
  const [videoLength, setVideoLength] = useState(null);
  const [numFrames, setNumFrames] = useState(null);
  const [sliderNum, setSliderNum] = useState(0);
  const [frames, setFrames] = useState([]);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const value = {
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
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
