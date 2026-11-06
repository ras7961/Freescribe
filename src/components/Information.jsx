import React, { useState } from "react";
import Transcribing from "./Transcribing";
import Translation from "./Translation";
import Transcription from "./Transcription";

export default function Information(Props) {
  const { output } = Props;
  const [tab, setTab] = useState("transcription");

  const [translation, setTranslation] = useState(null);
  const [toLanguage, setToLanguage] = useState(null);
  const [translating, setTranslating] = useState(null);

  function handleCopy() {
    navigator.clipboard.writeText();
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download(`FreeScribe_${new Date().toDateString()}.txt`);
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {}

  const textElement =
    tab === "transcription" ? output.map((val) => val.text) : "";

  return (
    <main className="flex-1 p-4 flex flex-col justify-center text-center pb-20 gap-3 max-w-prose w-full mx-auto sm:gap-4 md:gap-5">
      <h1 className="font-semibold  text-4xl md:text-5xl lg:text-6xl">
        Your <span className="text-blue-400">File</span>
      </h1>

      <div className="grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center">
        <button
          onClick={() => setTab("transcription")}
          className={
            "px-4 duration-200 py-1 font-medium " +
            (tab === "transcription"
              ? "bg-blue-400 text-white"
              : "text-blue-400 hover:text-blue-600")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => setTab("translation")}
          className={
            "px-4 duration-200 py-1 font-medium " +
            (tab === "translation"
              ? "bg-blue-400 text-white"
              : "text-blue-400 hover:text-blue-600")
          }
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col">
        {tab === "transcription" ? (
          <Transcription {...Props} textElement={textElement} />
        ) : (
          <Translation
            {...Props}
            toLanguage={toLanguage}
            setToLanguage={setToLanguage}
            translating={translating}
            setTranslating={setTranslating}
            translation={translation}
            setTranslation={setTranslation}
          />
        )}
      </div>

      <div className="flex items-center gap-4 mx-auto text-base">
        <button
          title="Copy"
          className="bg-white px-2 rounded aspect-square grid text-blue-300 place-items-center hover:text-blue-500 "
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          title="Download"
          className="bg-white px-2 rounded aspect-square grid text-blue-300 place-items-center hover:text-blue-500 "
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}
