import React from "react";
import { useEffect, useState } from "react";
import "../css/Header.css";

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
    <header className="w-full text-sm font-medium flex justify-between items-center px-10 py-5 bg-white shadow-md">
      <div class="ftrace text-black text-lg font-bold">
        <a href="/" className="flex text-red-700">
          f<p className="text-gray-900">trace</p>
        </a>
      </div>
      <div class="flex gap-10">
        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/championship">CHAMPIONSHIP</a>
        </div>

        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/sessions">SESSIONS</a>
        </div>

        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/learn">LEARN</a>
        </div>

        <div class="text-black hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2">
          <a href="/others">NEWS</a>
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
