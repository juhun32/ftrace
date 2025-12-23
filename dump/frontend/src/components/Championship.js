import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const Championship = () => {
  const [isDarkMode] = useContext(DarkModeContext);
  {console.log("darkmode-champ: " + isDarkMode)}

  return (
    <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
      <div className="grid grid-cols-[1fr_1fr_1fr] justify-items-center items-center dark:text-stone-100">
        <a
          href="/championship/driver"
          className="flex gap-2 border-transparent border-b-2 hover:text-red-700 hover:border-black hover:border-b-2"
        >
          <p className="text-red-700">DRIVER</p> STANDINGS
        </a>
        <div
          className={`vertical-divider-${isDarkMode ? "darkmode" : ""} py-5`}
        >
          &nbsp;
        </div>
        <a
          href="/championship/constructor"
          className="flex gap-2 border-transparent border-b-2 hover:text-red-700 hover:border-black hover:border-b-2"
        >
          <p className="text-red-700">CONSTRUCTOR</p> STANDINGS
        </a>
      </div>
    </div>
  );
};

export default Championship;
