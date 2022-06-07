import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import "./ScreenRecordTwo.css";

const ScreenRecordTwo = () => {
  const { state, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true });
  return (
    <div>
      <p className="vedioTitle">{state}</p>
      <video src={mediaBlobUrl} controls autoPlay loop />
      <div>
        <button onClick={startRecording}>start Recording</button>
        <button onClick={stopRecording}>stop Recording</button>
      </div>
    </div>
  );
};

export default ScreenRecordTwo;
