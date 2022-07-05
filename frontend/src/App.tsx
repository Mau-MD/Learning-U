import { Button } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RegisterIndex from "./components/Registration/RegisterIndex";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
