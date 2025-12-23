import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { DarkModeProvider } from "./components/DarkModeContext";

import Intro from "./components/Intro";
import Header from "./components/Header";

import Info from "./components/Info";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Session from "./components/Session";
import Latest from "./components/Latest";
import Championship from "./components/Championship";
import StandingDriver from "./components/StandingDriver";
import StandingConstructor from "./components/StandingConstructor";
import News from "./components/News";
import Learn from "./components/Learn";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="App grid grid-rows-[min-content_1fr] h-screen dark:bg-stone-800">
          <div className="header-container h-fit">
            <div className="header">
              <Header />
            </div>
          </div>
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Intro />} />

              <Route path="/info" element={<Info />} />
              <Route path="/info/drivers" element={<Drivers />} />
              <Route path="/info/teams" element={<Teams />} />

              <Route path="/sessions" element={<Session />} />
              <Route path="/sessions/latest" element={<Latest />} />

              <Route path="/championship" element={<Championship />} />
              <Route path="/championship/driver" element={<StandingDriver />} />
              <Route
                path="/championship/constructor"
                element={<StandingConstructor />}
              />

              <Route path="/news" element={<News />} />
              <Route path="/learn" element={<Learn />} />

              <Route path="/about" element={<About />} />
              <Route path="/about/contact" element={<Contact />} />

              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
