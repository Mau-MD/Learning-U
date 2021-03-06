import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DifficultyIndex from "./components/Difficulty/DifficultyIndex";
import Home from "./components/Home";
import HubIndex from "./components/Hub/HubIndex";
import Navbar from "./components/Navbar";
import LoginIndex from "./components/Registration/LoginIndex";
import RegisterIndex from "./components/Registration/RegisterIndex";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<div>Not found</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterIndex />} />
        <Route path="/login" element={<LoginIndex />} />
        <Route path="courses">
          <Route path="difficulty/:id" element={<DifficultyIndex />} />
          <Route path="hub/:id" element={<HubIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
