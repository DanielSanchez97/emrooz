import React from "react";
import ReactDOM from "react-dom/client";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import App from "./App";
import "./styles.css";

window.fetch = tauriFetch as unknown as typeof window.fetch;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
