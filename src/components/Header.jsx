import React from "react";

export default function Header() {
  return (
    <header className="flex items-center p-4 justify-between gap-4 ">
      <a href="/">
        <h1 className="font-medium">
          Free<span className="text-blue-400">Scribe</span>{" "}
        </h1>
      </a>
      <a
        href="/"
        className="flex items-center gap-2 specialBtn p-2 px-3 rounded-lg text-blue-400"
      >
        <p className="">New</p>
        <i className="fa-solid fa-plus"></i>
      </a>
    </header>
  );
}
