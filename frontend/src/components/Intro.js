import React from "react";
import Model from "../Model";

import { TbAntennaBars5 } from "react-icons/tb";
import { AiOutlineGoogle } from "react-icons/ai";

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

        <div class="w-full h-[2px] bg-stone-900 rounded"></div>

        <div className="flex justify-center items-end flex-col">
          <p className="text-lg mb-2">
            Explore Formula 1 data with FastF1 API and OpenF1 API, view data in
            tables and charts.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <a
          className="flex justify-center items-center gap-2 border-[2px] border-stone-700 rounded-md px-3 py-1 text-base hover:bg-stone-700 hover:text-white"
          href="https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=profile email"
        >
          <AiOutlineGoogle />Sign in with Google
        </a>
      </div>
      <div className="rounded-lg">
        <Model />
      </div>
    </div>
  );
};

export default Intro;
