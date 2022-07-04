import * as React from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const { toggleColorMode } = useColorMode();

  return (
    <BrowserRouter>
      <Button onClick={() => toggleColorMode()}>Toggle</Button>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
