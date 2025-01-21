import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Intro from "./components/Intro";
import Header from "./components/Header";

import Info from "./components/Info";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Next from "./components/Next";
import Latest from "./components/Latest";
import StandingDriver from "./components/StandingDriver";
import StandingConstructor from "./components/StandingConstructor";
import News from "./components/News";
import Learn from "./components/Learn";
import About from "./components/About";
import Contact from "./components/Contact";

import DataChart from "./data/DataChart";
import DataTableSessions from "./data/DataTableSessions";
import InteractiveSessions from "./data/InteractiveSessions";
import InteractiveLaps from "./data/InteractiveLaps";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header-container">
          <div className="header">
            <Header />
          </div>

          <div className="content-container">
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/info" element={<Info />} />
              <Route path="/info/drivers" element={<Drivers />} />
              <Route path="/info/teams" element={<Teams />} />
              <Route path="/sessions" element={<Next />} />
              <Route path="/sessions/latest" element={<Latest />} />
              <Route path="/championship" element={<StandingDriver />} />
              <Route
                path="/championship/constructor"
                element={<StandingConstructor />}
              />
              <Route path="/others" element={<News />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
