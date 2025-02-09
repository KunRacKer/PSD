import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PredictionPages from "./pages/PredictionPages";
import TestPages from "./pages/TestPages";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<PredictionPages/>}/>
        <Route path="/test" element={<TestPages/>}/>
      </Routes>
    </Router>
  )
}

export default App;
