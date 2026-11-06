import React, { useState, useEffect, useRef } from "react";

export default function Homepage(props) {
  const { setFile, setAudioStream } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;
    console.log("start recording");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }
    setRecordingStatus("recording");
    //Create new media recorder instance
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      console.log(event);
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    console.log("stop recording");
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  console.log(duration);

  console.log(recordingStatus);

  return (
    <main className="flex-1 p-4 flex flex-col justify-center items-center pb-20 gap-3 sm:gap-4 md:gap-5">
      <h1 className="font-semibold  text-5xl md:text-6xl lg:text-7xl">
        Free<span className="text-blue-400">Scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span> Translate
        <span></span>
      </h3>
      <button
        onClick={
          recordingStatus === "recording" ? stopRecording : startRecording
        }
        className="bg-white px-4 py-2 rounded-xl flex item-center justify-between gap-4 mx-auto text-base w-72 max-w-full my-4 specialBtn"
      >
        {console.log(recordingStatus)}
        <p className="text-blue-400">
          {recordingStatus === "inactive" ? "Record" : "Stop recording"}
        </p>
        <div className="flex items-center gap-2 ">
          {duration !== 0 && <p className="text-sm">{duration}s</p>}
          <i
            className={
              "fa-solid fa-microphone " +
              (recordingStatus === "recording" ? "text-rose-300" : "")
            }
          ></i>
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label className="text-blue-400 hover:text-blue-600 duration-200 cursor-pointer">
          Upload
          <input
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            type="file"
            accept=".mp3,.wave"
            className="hidden"
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="italic text-slate-500">free for now free forever</p>
    </main>
  );
}
