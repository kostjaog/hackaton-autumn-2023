import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/all.scss";
import "react-calendar/dist/Calendar.css";
import { ArcElement, Chart } from "chart.js";

Chart.register(ArcElement);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
