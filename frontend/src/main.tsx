import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FBFBFB",
      200: "#E4E7EB",
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
