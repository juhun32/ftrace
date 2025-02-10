import React from "react";
import Model from "../Model";
// import "../css/Intro.css";

import { TbAntennaBars5 } from "react-icons/tb";

const Intro = () => {
  return (
    <div className="intro-container flex justify-center items-center flex-col h-[calc(100vh-5rem)]">
      <div className="flex justify-center items-end flex-col gap-2 text-right">
        <div className="flex flex-row gap-3">
          <h1 className="text-4xl font-bold text-red-700">FO </h1>
          <h1 className="flex items-center text-4xl font-bold gap-3">
            Statistics <TbAntennaBars5 />
          </h1>
        </div>

        <div class="w-full h-1 bg-gray-800 rounded"></div>

        <div className="flex justify-center items-end flex-col">
          <p className="text-lg mb-2">
            Explore Formula 1 data with FastF1 API and OpenF1 API, view data in
            tables and charts.
          </p>
        </div>
      </div>
      <div className="">
        <Model />
      </div>
    </div>
  );
};

export default Intro;
