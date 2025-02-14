import React, { useContext } from "react";
import { useEffect, useState } from "react";
import "../css/Header.css";

import { DarkModeContext } from "./DarkModeContext";

import { AiFillMoon } from "react-icons/ai";
import { AiFillSun } from "react-icons/ai";

// import home from "../img/home.png";
// import { useEffect } from "react";

const Menu = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));
      if (userCookie) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useContext(DarkModeContext);
  {
    console.log("darkmode: " + isDarkMode);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", isDarkMode); // Save preference
  }, [isDarkMode]);

  return (
    <header className="w-full text-sm font-medium flex justify-between items-center px-10 py-5 shadow-md">
      <div className="ftrace text-black text-lg font-bold">
        <a
          href="/"
          className={`flex text-red-700 px-5 ${isDarkMode ? "darkmode" : ""}`}
        >
          <p className="f">f</p>
          <p className="trace text-gray-900 dark:text-stone-100">trace</p>
        </a>
      </div>
      <div className="flex gap-10">
        <div className="text-black hover:text-red-700 border-transparent border-b-[1px] hover:border-black hover:border-b-[1px] dark:text-stone-100 dark:hover:border-stone-100">
          <a href="/others">ANALYSIS</a>
        </div>

        <div className="text-black hover:text-red-700 border-transparent border-b-[1px] hover:border-black hover:border-b-[1px] dark:text-stone-100 dark:hover:border-stone-100">
          <a href="/sessions">SESSIONS</a>
        </div>

        <div className="text-black hover:text-red-700 border-transparent border-b-[1px] hover:border-black hover:border-b-[1px] dark:text-stone-100 dark:hover:border-stone-100">
          <a href="/championship">CHAMPIONSHIP</a>
        </div>

        <div className="text-black hover:text-red-700 border-transparent border-b-[1px] hover:border-black hover:border-b-[1px] dark:text-stone-100 dark:hover:border-stone-100">
          <a href="/learn">LEARN</a>
        </div>

        <div className="text-black hover:text-red-700 border-transparent border-b-[1px] hover:border-black hover:border-b-[1px] dark:text-stone-100 dark:hover:border-stone-100">
          <a href="/about">ABOUT</a>
        </div>
      </div>

      {isAuthenticated ? (
        <div className="flex gap-3">
          <div className="text-black hover:text-red-700 border-transparent border-b-[1px] hover:border-black hover:border-b-[1px] dark:text-stone-100 dark:hover:border-stone-100">
            <a href="/about">PROFILE</a>
          </div>
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="flex justify-center items-center"
          >
            {isDarkMode ? (
              <AiFillMoon className="text-xl text-stone-100" />
            ) : (
              <AiFillSun className="text-xl" />
            )}
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <div className="border-transparent border-b-[1px] invisible">
            <p>PROFILE</p>
          </div>
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="flex justify-center items-center"
          >
            {isDarkMode ? (
              <AiFillMoon className="text-xl text-stone-100" />
            ) : (
              <AiFillSun className="text-xl" />
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Menu;
