import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Intro from "./components/Intro";
import Menu from "./components/Menu";
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
        <div className="container">
          <div className="menu-container">
            <Menu />
          </div>

          <div className="content-container">
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/next" element={<Next />} />
              <Route path="/latest" element={<Latest />} />
              <Route path="/standing-driver" element={<StandingDriver />} />
              <Route
                path="/standing-constructor"
                element={<StandingConstructor />}
              />
              <Route path="/news" element={<News />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
