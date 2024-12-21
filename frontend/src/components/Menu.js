import React from "react";
import "../css/Menu.css";

import home from "../img/home.png";

const Menu = () => {
  return (
    <nav>
      <ul>
        <div className="menu-header">
          <a href="/"><img src={home} alt="Home" /></a>
        </div>
        <div className="menu-item">
          <p>Team Information</p>
          <li>
            <a href="/drivers">Drivers Info</a>
          </li>
          <li>
            <a href="/teams">Teams Info</a>
          </li>
        </div>
        <div className="menu-item">
          <p>Race Information</p>
          <li>
            <a href="/races">Recent Race Results</a>
          </li>
          <li>
            <a href="/latest">Latest Session Info</a>
          </li>
        </div>
        <div className="menu-item">
          <p>Championship</p>
          <li>
            <a href="/standing-driver">Drivers Standing</a>
          </li>
          <li>
            <a href="/standing-constructor">Constructors Standing</a>
          </li>
        </div>
        <div className="menu-item">
          <p>Others</p>
          <li>
            <a href="/news">Formula 1 News</a>
          </li>
          <li>
            <a href="/learn">Learn Formula 1</a>
          </li>
        </div>
      </ul>
      <ul className="menu-footer">
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li className="copyright">
          <a>&copy; Copyright Juhun Park 2024</a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
