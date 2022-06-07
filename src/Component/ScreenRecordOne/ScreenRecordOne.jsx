import React from "react";
import "./ScreenRecordOne.css";

function ScreenRecordOne() {
  let streem = null;
  let audio = null;
  let mixedStreem = null;
  let chunks = [];
  let recorder = null;
  let dowenBtn = null;
  let recordedVideo = null;

  window.addEventListener("load", () => {
    dowenBtn = document.querySelector(".download-video");
    recordedVideo = document.querySelector(".recorded-video");
  });

  //============= setup streem Fuction ===================

  const setupStreem = async () => {
    streem = await navigator.mediaDevices.getDisplayMedia({
      vedio: true,
    });
    audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    setupVideoFeedback();
  };

  const setupVideoFeedback = () => {
    if (streem) {
      const video = document.querySelector(".video__feedback");
      video.srcObject = streem;
      video.play();
    } else {
      console.warn("No streem available");
    }
  };

  // ===================== start recording ===========================

  const startReacrding = async () => {
    await setupStreem();

    if (streem && audio) {
      mixedStreem = new MediaStream([
        ...streem.getTracks(),
        ...audio.getTracks(),
      ]);
      recorder = new MediaRecorder(mixedStreem);
      recorder.ondataavailable = handleDataAvailable;
      recorder.onstop = handleStop;
      recorder.start(1000);

      console.log("recording started");
    } else {
      console.warn("No streem available");
    }
  };
  // ================== stop recording =====================
  const stopRecording = () => {
    recorder.stop();
    let vedioDowenloadSection = document.querySelector(
      ".vedioDowenload__section"
    );
    vedioDowenloadSection.style.display = "block";
  };

  // ================== save data =========================
  const handleDataAvailable = (e) => {
    chunks.push(e.data);
  };

  const handleStop = (e) => {
    const blob = new Blob(chunks, { type: "video/mp4" });
    chunks = [];
    dowenBtn.href = URL.createObjectURL(blob);
    dowenBtn.download = "video.mp4";
    recordedVideo.src = URL.createObjectURL(blob);
    recordedVideo.load();
    recordedVideo.onloadeddata = function () {
      recordedVideo.play();
    };
  };

  return (
    <div className="App ">
      <div className="header">
        <div className="container">
          <h1>record screen app</h1>
        </div>
      </div>

      <div className="main container">
        <h2 className="main__title">video record</h2>
        <video src="" autoPlay className="video__feedback"></video>

        <div className="main__btn">
          <button onClick={startReacrding} className="start-recording">
            Record Screen
          </button>
          <button onClick={stopRecording} className="stop-recording">
            top Recording
          </button>
        </div>

        <div className="vedioDowenload__section">
          <h2 className="main__title">Recorded video</h2>

          <video src="" className="recorded-video"></video>
          <div className="downloadVideo__btn">
            <a className="download-video">Download</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenRecordOne;
