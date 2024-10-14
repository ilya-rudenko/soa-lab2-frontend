import "./App.css";
import { useEffect, useState } from "react";
import Labwork from "./Labwork/Labwork";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LabworksPage from "./LabworksPage/LabworksPage";
import Header from "./Header/Header";
import Home from "./Home/Home";
import LabworkPage from "./LabworkPage/LabworkPage";
import Cockpit from "./Cockpit/Cockpit";
import BARS from "./BARS/BARS";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/labworks" element={<LabworksPage />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/labworks/:id" element={<LabworkPage />} />
        <Route exact path="/cockpit" element={<Cockpit />} />
        <Route exact path="/bars" element={<BARS />} />
      </Routes>
    </div>
  );
}

// faculty -> discipline -> labwork

export default App;
