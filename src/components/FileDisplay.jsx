import React from "react";

export default function FileDisplay(props) {
  const { handlerAudioReset, file, audioStream, handleFormSubmission } = props;

  return (
    <main className="flex-1 p-4 flex flex-col justify-center text-center pb-20 gap-3 w-fit max-w-full mx-auto sm:gap-4 md:gap-5">
      <h1 className="font-semibold  text-4xl md:text-5xl lg:text-6xl">
        Your <span className="text-blue-400">File</span>
      </h1>
      <div className="flex flex-col text-left mx-auto my-4">
        <h3 className="font-semibold">Name</h3>
        <p className="">{file ? file?.name : "custom audio"}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlerAudioReset}
          className="text-slate-400 hover:text-blue-600 duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleFormSubmission}
          className="specialBtn px-3 py-2 rounded-lg text-blue-400 flex items-center gap-2"
        >
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
}
