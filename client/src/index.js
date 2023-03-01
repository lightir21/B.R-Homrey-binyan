import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "normalize.css";
import App from "./App";
import ScrollToTop from "./utils/ScrollTopTop";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
