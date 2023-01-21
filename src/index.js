import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ThemeProvider } from "./Context/ThemeContext/ThemeContext";
import { Provider as OpenModalProvider } from "./Context/OpenModal/OpenModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <OpenModalProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </OpenModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
