import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ScaffoldScreen } from "./features/scaffold/ScaffoldScreen";
import "./styles/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root element is missing");
}

createRoot(root).render(
  <StrictMode>
    <ScaffoldScreen />
  </StrictMode>,
);
