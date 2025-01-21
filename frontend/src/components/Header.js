import React from "react";
import "../css/Menu.css";

import home from "../img/home.png";
import { useEffect } from "react";

const Menu = () => {
  return (
    // <header>

    // </header>

    <header className="fixed w-full text-base font-bold flex justify-between items-center px-10 py-7 bg-white shadow-md">
      <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
        <a href="/" class="px-1">HOME</a>
      </div>
      <div class="flex gap-10">
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/info" class="px-1">DRIVER / TEAM</a>
        </div>
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/sessions" class="px-1">SESSIONS</a>
        </div>
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/championship" class="px-1">CHAMPIONSHIP</a>
        </div>
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/learn" class="px-1">LEARN</a>
        </div>
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/others" class="px-1">OTHERS</a>
        </div>
      </div>
      <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
        <a href="/about">ABOUT</a>
      </div>
    </header>
  );
};

export default Menu;
