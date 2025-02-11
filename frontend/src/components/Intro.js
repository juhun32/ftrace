import React from "react";
import Model from "../Model";

import { TbAntennaBars5 } from "react-icons/tb";

const Intro = () => {
  return (
    <div className="intro-container grid grid-rows-[3fr_1fr_4fr] justify-center justify-items-center h-[calc(100vh-5rem)]">
      <div className="flex justify-end items-end flex-col gap-2 text-right">
        <div className="flex flex-row gap-3">
          <h1 className="text-4xl font-bold text-red-700"></h1>
          <h1 className="flex items-end text-4xl font-semibold">
            <p className="text-red-700">f</p>trace <TbAntennaBars5 />
          </h1>
        </div>

        <div class="w-full h-[2px] bg-gray-900 rounded"></div>

        <div className="flex justify-center items-end flex-col">
          <p className="text-lg mb-2">
            Explore Formula 1 data with FastF1 API and OpenF1 API, view data in
            tables and charts.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p>
          login box
        </p>
      </div>
      <div className="rounded-lg">
        <Model />
      </div>
    </div>
  );
};

export default Intro;
