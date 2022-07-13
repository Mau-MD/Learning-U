import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
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

const queryClient = new QueryClient();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ColorModeScript />
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
