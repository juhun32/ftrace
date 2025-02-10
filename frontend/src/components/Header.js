import React from "react";
import { useEffect, useState } from "react";
// import "../css/Menu.css";

// import home from "../img/home.png";
// import { useEffect } from "react";

const Menu = () => {
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

  return (
    <header className="w-full text-base font-bold flex justify-between items-center px-10 py-5 bg-white shadow-md">
      <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
        <a href="/" class="px-1">
          HOME
        </a>
      </div>
      <div class="flex gap-10">
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/info" class="px-1">
            DRIVER / TEAM
          </a>
        </div>

        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/championship" class="px-1">
            CHAMPIONSHIP
          </a>
        </div>

        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/sessions" class="px-1">
            SESSIONS
          </a>
        </div>

        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/learn" class="px-1">
            LEARN
          </a>
        </div>

        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/others" class="px-1">
            NEWS
          </a>
        </div>

        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/about">ABOUT</a>
        </div>
      </div>

      {isAuthenticated ? (
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/about">PROFILE</a>
        </div>
      ) : (
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/about">LOGIN</a>
        </div>
      )}
    </header>
  );
};

export default Menu;
