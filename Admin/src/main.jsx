import { lazy, Suspense } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Lazy import app
const App = lazy(() => import("./App.jsx"));

import "./index.css";
import { RootLoader } from "./components/ui/loaders/root-loader.jsx";

// Set the initial theme on the body element
const savedTheme = localStorage.getItem("app-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark"); // Ensure light theme is applied initially
}

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<RootLoader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
