import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Scaffold } from "./views/Scaffold/Scaffold";
import "./styles/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root element is missing");
}

createRoot(root).render(
  <StrictMode>
    <Scaffold />
  </StrictMode>,
);
